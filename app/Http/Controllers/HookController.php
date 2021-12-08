<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use App\Shop;

class HookController extends Controller
{
    function verifyWebhook($data, $hmac_header){
        $calculated_hmac = base64_encode(hash_hmac('sha256', $data, env('SHOPIFY_SECRET'), true));
        return ($hmac_header == $calculated_hmac);
    }

    function verifyWebhookNewSecret($data, $hmac_header){
        $calculated_hmac = base64_encode(hash_hmac('sha256', $data, env('SHOPIFY_SECRET'), true));
        return ($hmac_header == $calculated_hmac);
    }

    public function productUpdates(Request $request)
    {
        Log::info('hook product update');
        $hmac_header = $request->server('HTTP_X_SHOPIFY_HMAC_SHA256');
        $shop_url = $request->server('HTTP_X_SHOPIFY_SHOP_DOMAIN');
        $shop = Shop::where('url', $shop_url)->first();
        if(empty($shop->id)) return;
        $data = $request->getContent();
        $verified = $this->verifyWebhook($data, $hmac_header) || $this->verifyWebhookNewSecret($data, $hmac_header);
        if(!$verified) return;

        $product = json_decode($data, true);
        
        Log::info($product);

        return;
    }
}
