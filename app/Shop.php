<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    protected $fillable = ['url','token','theme_id','settings'];

    public function ShopifyApi(){
         return new \PHPShopify\ShopifySDK(['ShopUrl' => $this->url, 'AccessToken' => $this->token, 'ApiVersion' => env('SHOPIFY_API_VERSION')]);
    }

    public function getAllProducts(){
        $shopify = $this->ShopifyApi();
        $products = $shopify->Product->get();

        return $products;
    }

}
