//
// commonoutline.js
// Summary: Common area for css files.
// Icon: commonoutline.jpg
//

$.commonoutline_config = {
    name: 'One-Click Apps',
    baseURL: null,
    version: '1451337656833',
    manifest: 'outline/commonoutline.xml',
    updatefile: 'commonoutline1451337656833.cdpupdate',
    username: 'mom',
    password: 'lkjsdfsod',
    remoteStart: 'node/2',
    localStart: '',
    localBaseURL: '%ALLUSERSPROFILE%\\cdp\\common\\outline\\',
    alerts: null,
    updatelog: 'common.update.xml',
    branch: '2.0',
    LURL: '%ALLUSERSPROFILE%\\cdp\\snapback\\apps\\common\\outline\\commonoutline.xml',
    RURL: 'http://snapback-apps.com/commonoutline/commonoutline.xml',
    status: 'development-snapshot'
}
;

$.commonoutline_config.baseURL = $.commonoutline_config.RURL;
$.commonoutline_config.baseURL = "http://" + $.commonoutline_config.baseURL.substring($.commonoutline_config.baseURL.indexOf('@') + 1, $.commonoutline_config.baseURL.lastIndexOf('/'));
$.commonoutline_config.baseURL = $.commonoutline_config.baseURL.substring(0, $.commonoutline_config.baseURL.lastIndexOf('/') - 9);
$.commonoutline_config.alerts = $.commonoutline_config.baseURL + 'feed.xml';
