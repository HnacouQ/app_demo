<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use App\Shop;
use File;

class AdminController extends Controller
{
    //

    public function index(Request $request){

        
        
        $shop_url   = Session::get('SESSION_URL');
        $shop_token = Session::get('SESSION_TOKEN');

        $shop = Shop::where('url', $shop_url)->first();
        $restAPI = $shop->ShopifyApi();
       
        // dd($shop->token);
    
        return view('admin.index',compact('shop'));
    }

    public function getAllProduct(Request $request){
        
        $shop = Shop::where('url', $request->shop)->first();
        $restAPI = $shop->ShopifyApi();
        $products = $restAPI->Product->get(['fields' => 'id,title,handle,image,variants']);
        return response()->json([
			'success' => true,
			'products' => $products
		]);

    }

    public function getThemes(Request $request){
        
        $shop = Shop::where('url', $request->shop)->first();
        $restAPI = $shop->ShopifyApi();
        $themes = $restAPI->Theme->get(['fields' => 'id,name,role', 'role' => 'main,unpublished']);
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
        $restAPI = $shop->ShopifyApi();  
        $theme_file = $restAPI->Theme($theme_id)->Asset->get(['asset' => ['key' => 'layout/theme.liquid'], 'fields' => 'value']);
        $theme_liquid = $theme_file['asset']['value'];
        

        if(strpos($theme_liquid, "{% include 'HQA_script' %}") == false){
            $theme_liquid = str_replace('</body>', "{% include 'HQA_script' %}</body>", $theme_liquid);
            $restAPI->Theme($theme_id)->Asset()->put(['key' => 'layout/theme.liquid', 'value' => $theme_liquid]);
            $restAPI->Theme($theme_id)->Asset()->put(['key' => 'snippets/HQA_script.liquid', 'value' => '<script>'.File::get(base_path('public/js/test.js')).'</script>']);
        }

        
        $shop->theme_id = $theme_id;
        $shop->save();
        return response()->json([
			'success' => true,
		]);
       

    }

    public function uninstall(Request $request){
        dd($request->all());
    }
}
