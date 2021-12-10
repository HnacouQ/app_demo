<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wellcome to Admin</title>
    <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@7.4.1/build/esm/styles.css"
    />
    <style>
        body{
            background-image: url(https://wallpaperaccess.com/full/21534.jpg);
            background-size: cover;
        }

        .Polaris-Header-Title__TitleAndSubtitleWrapper > h1.Polaris-Header-Title{
            color: #fff !important;
        }

    </style>
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript">
    window.App = {!!json_encode([
        'csrfToken'       => csrf_token(),
        'apiKey'          => env('SHOPIFY_API_KEY'),
        'shopOrigin'      => $shop->url,
        'api_url'         => url('api'),
        'url'             => url(''),
      ])!!};
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>