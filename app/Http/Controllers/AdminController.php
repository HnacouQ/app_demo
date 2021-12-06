<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use App\Shop;


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
}
