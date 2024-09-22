<?php
    //<!-- wp-content/themes/wp-react-theme/functions.php -->
?>
<?php

function wp_react_theme_enqueue_scripts() {
    wp_enqueue_style('wp-react-theme-style', get_stylesheet_uri());
    wp_enqueue_script('wp-react-app', get_template_directory_uri() . '/build/static/js/main.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'wp_react_theme_enqueue_scripts');

function wp_react_theme_setup() {
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'wp-react-theme'),
    ));
}
add_action('after_setup_theme', 'wp_react_theme_setup');

function add_cors_http_header() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

add_action('init', 'add_cors_http_header');

function add_cors_headers() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', 'add_cors_headers');
}, 15);

// REST API endpoints
function wp_custom_endpoints() {
    register_rest_route('wp/v2', '/header', array(
        'methods' => 'GET',
        'callback' => 'get_header_data',
    ));
    register_rest_route('wp/v2', '/footer', array(
        'methods' => 'GET',
        'callback' => 'get_footer_data',
    ));
    register_rest_route('wp/v2', '/header-footer', array(
        'methods' => 'GET',
        'callback' => 'get_header_footer_data',
    ));
}

add_action('rest_api_init', 'wp_custom_endpoints');


function get_header_data() {

    $site_url = get_site_url();


    $graphql_query = '
    query GetHeaderData {
      generalSettings {
        title
        description
      }
        menuItems(where: {location: PRIMARY}) {
            nodes {
                id
                label
                url
            }
        }
    }';

    $response = wp_remote_post($site_url.'/graphql', array(
        'method'    => 'POST',
        'headers'   => array('Content-Type' => 'application/json'),
        'body'      => json_encode(array('query' => $graphql_query)),
    ));

    if (is_wp_error($response)) {
        return new WP_REST_Response(array('error' => 'GraphQL request failed'), 500);
    }

    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body, true);

    if (isset($data['errors'])) {
        return new WP_REST_Response(array('error' => 'GraphQL query error', 'details' => $data['errors']), 500);
    }

    // All WP Rest Api Results
    $wp_restapi_response = wp_remote_get($site_url.'/wp-json/');
    if (is_wp_error($wp_restapi_response)) {
        return new WP_REST_Response(array('error' => 'REST API request failed'), 500);
    }

    $wp_restapi_response_body = wp_remote_retrieve_body($wp_restapi_response);
    $wp_restapi_response_data = json_decode($wp_restapi_response_body, true);

    //Site Logo ID
    $site_logo_id = $wp_restapi_response_data['site_logo'];

    // Site Logo URL
    $site_logo_response = wp_remote_get($site_url."/wp-json/wp/v2/media/$site_logo_id");
    if (is_wp_error($site_logo_response)) {
        return new WP_REST_Response(array('error' => 'Site logo request failed'), 500);
    }
    $site_logo_body = wp_remote_retrieve_body($site_logo_response);
    $site_logo_data = json_decode($site_logo_body, true);
    $logo_url = $site_logo_data['media_details']['sizes']['full']['source_url'];
    
    // Site Favicon URL
    $site_favicon_url = $wp_restapi_response_data['site_icon_url'];

    $header_data = array(
        'siteTitle' => $data['data']['generalSettings']['title'],
        'siteDescription' => $data['data']['generalSettings']['description'],
        'siteUrl' => get_site_url(),
        'primaryMenu' => $data['data']['menuItems']['nodes'],
        'siteLogo' => $logo_url,
        'siteFavicon' => $site_favicon_url
    );

    return new WP_REST_Response(array('header' => $header_data, 200));
}

function get_footer_data() {
    // Footer data
    return new WP_REST_Response(array('footer' => 'Footer data'), 200);
}

function get_header_footer_data() {
    $site_url = get_site_url();
    
    $wp_restapi_response = wp_remote_get($site_url.'/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer');
    if (is_wp_error($wp_restapi_response)) {
        return new WP_REST_Response(array('error' => 'REST API request failed'), 500);
    }

    $wp_restapi_response_body = wp_remote_retrieve_body($wp_restapi_response);
    $wp_restapi_response_data = json_decode($wp_restapi_response_body, true);

    $header_data = $wp_restapi_response_data['data']['header'];
    $footer_data = $wp_restapi_response_data['data']['footer'];

    return new WP_REST_Response(array('header' => $header_data, 'footer' => $footer_data), 200);
}


?>