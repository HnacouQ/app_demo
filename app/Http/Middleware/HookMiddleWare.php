<?php

namespace App\Http\Middleware;

use Closure;

class HookMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $hmac_header = $request->server('HTTP_X_SHOPIFY_HMAC_SHA256');
        $shop_url = $request->server('HTTP_X_SHOPIFY_SHOP_DOMAIN');
        $data = $request->getContent();
        $calculated_hmac = base64_encode(hash_hmac('sha256', $data, env('SHOPIFY_SECRET'), true));
        if( $hmac_header == $calculated_hmac )
            return $next($request);
    }
}
