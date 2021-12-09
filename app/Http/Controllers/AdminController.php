<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use App\Shop;
use File;
use Log;

class AdminController extends Controller
{
    //

    public function index(Request $request){

        
        
        $shop_url   = Session::get('SESSION_URL');
        $shop_token = Session::get('SESSION_TOKEN');

        $shop = Shop::where('url', $shop_url)->first();
        $shopify = $shop->ShopifyApi();
       
        // dd($shop->token);
    
        return view('admin.index',compact('shop'));
    }

    public function getAllProduct(Request $request){
        
        $shop = Shop::where('url', $request->shop)->first();
        $shopify = $shop->ShopifyApi();
        $products = $shopify->Product->get(['fields' => 'id,title,handle,image,variants']);
        return response()->json([
			'success' => true,
			'products' => $products
		]);

    }

    public function getThemes(Request $request){
        
        $shop = Shop::where('url', $request->shop)->first();
        $shopify = $shop->ShopifyApi();
        $themes = $shopify->Theme->get(['fields' => 'id,name,role', 'role' => 'main,unpublished']);
        $theme_selected_default = $themes[0]['id'];
        foreach($themes as $theme){
            if($theme['id'] != $shop->theme_id){
                $theme_selected = $theme_selected_default;
                $shop->theme_id = $theme_selected_default;
                $shop->save();
            }else{
                $theme_selected = $shop->theme_id;
            }
        }

        return response()->json([
			'success' => true,
			'themes' => $themes,
            'theme_selected' => $theme_selected,
		]);
        
        

    }

    public function install(Request $request){
        $files = [];
        $theme_id = $request->theme_id;
        $shop = Shop::where('url', $request->shop)->first();
        $shopify = $shop->ShopifyApi();  
        $theme_file = $shopify->Theme($theme_id)->Asset->get(['asset' => ['key' => 'layout/theme.liquid'], 'fields' => 'value']);
        $theme_liquid = $theme_file['asset']['value'];
        

        if(strpos($theme_liquid, "{% include 'HQA_script' %}") == false){
            $theme_liquid = str_replace('</body>', "{% include 'HQA_script' %}</body>", $theme_liquid);
            $shopify->Theme($theme_id)->Asset()->put(['key' => 'layout/theme.liquid', 'value' => $theme_liquid]);
            $shopify->Theme($theme_id)->Asset()->put(['key' => 'snippets/HQA_script.liquid', 'value' => File::get(base_path('public/js/HQA_App.js'))]);
            
        }

        $shopify->Theme($theme_id)->Asset()->put(['key' => 'assets/QA_App.js', 'value' => File::get(base_path('public/js/main.js'))]);
        $shopify->Theme($theme_id)->Asset()->put(['key' => 'assets/QA_App.css', 'value' => File::get(base_path('public/css/main.css'))]);

        
        $shop->theme_id = $theme_id;
        $shop->save();
        return response()->json([
        'success' => true,
      ]);
       

    }

    public function uninstall(Request $request){
        dd($request->all());
    }

    public function addWhishList(Request $request){
      
      $shop = Shop::where('url', $request->shop)->first();
      $shopify = $shop->ShopifyApi();
      $product = $shopify->Product($request->id)->get(['fields' => 'id,title,handle,image,variants']);
      return response()->json([
        'success' => true,
        'product' => $product,
      ]);
    }

    public function removeWhishList(Request $request){
        dd($request->all());
    }

    public function test(Request $request){
        $shop = Shop::whereUrl('hnacouq-1.myshopify.com')->first();
        $shopify = new \PHPShopify\ShopifySDK(array( 'ShopUrl' => $shop->url, 'AccessToken' => $shop->token, 'ApiVersion' => env('SHOPIFY_API_VERSION') ));
        
        // dd($shopify);

        

        // $webhooks = [
        //     'products/update'   => secure_url('hooks/products/update')
        // ];
        
        // $this->registerWebhooks($shopify,$webhooks);

        $hooks = $shopify->Webhook()->get();

        dd($hooks);
    }

    public function registerWebhooks($shopify, $webhooks){
        $topics = array_keys($webhooks);
        $cur_webhooks = $shopify->Webhook->get(['fields' => 'id,topic,address']);
  
        if( !empty($cur_webhooks) ){
          foreach ($cur_webhooks as $webhook){
            if (!in_array($webhook['topic'], $topics)) {
              //Delete
              $shopify->Webhook($webhook['id'])->delete();
            }elseif (in_array($webhook['topic'], $topics) && $webhook['address'] != $webhooks[$webhook['topic']]) {
              //Edit
              $shopify->Webhook($webhook['id'])->put([
                'address' => $webhook['address']
              ]);
              unset($webhooks[$webhook['topic']]);
            }elseif (in_array($webhook['topic'], $topics) && $webhook['address'] == $webhooks[$webhook['topic']]) {
              unset($webhooks[$webhook['topic']]);
            }
          }
        }
  
        foreach($webhooks as $topic => $address){
          $shopify->Webhook->post([
            'topic' => $topic,
            'address' => $address
          ]);
        }
      }

}
