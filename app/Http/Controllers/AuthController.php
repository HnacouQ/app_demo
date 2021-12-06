<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Shop;

class AuthController extends Controller
{
    public function index(Request $req){
        if($req->has('code')){
            \PHPShopify\ShopifySDK::config(['ShopUrl' => $req->shop, 'ApiKey' => env('SHOPIFY_API_KEY'), 'SharedSecret' => env('SHOPIFY_SECRET')]);
            
            $verify = \PHPShopify\AuthHelper::verifyShopifyRequest();
            
            if($verify){
                $shop_token = \PHPShopify\AuthHelper::getAccessToken();
                if(Shop::where('url', $req->shop)->count() > 0){
                    $shop = Shop::where('url', $req->shop)->first();
                    $shop->update(['token' => $shop_token]);
                }else{
                    $shop                  = new Shop();
                    $shop->url             = $req->shop;
                    $shop->token           = $shop_token;
                    $shop->save();
                    
                }
               
                session(['SESSION_URL' => $req->shop,'SESSION_TOKEN'=>$shop_token]);

                return redirect('/admin/index');


            }
        }else if($req->has('shop')){
            $scopes = 'read_products,write_products,read_script_tags,write_script_tags,read_themes,write_themes';
            preg_match('/^[a-zA-Z0-9\-]+.myshopify.com$/', $req->shop) or die('Invalid myshopify.com store URL.');
            \PHPShopify\ShopifySDK::config(['ShopUrl' => $req->shop, 'ApiKey' => env('SHOPIFY_API_KEY'), 'SharedSecret' => env('SHOPIFY_SECRET')]);
            $installURL = \PHPShopify\AuthHelper::createAuthRequest($scopes, secure_url('authorize'), null, null, true);
            die("<script>top.location.href='$installURL'</script>");
            exit;
        }else{
            return view('admin.login');
        }
    }
}
