//
// common.js
// Summary: Common area for shared files. 
// Icon: common.jpg
//

$.common_config = {
    name: 'One-Click Apps',
    baseURL: null,
    version: '1451930521943',
    manifest: 'common.xml',
    updatefile: 'common1451930521943.cdpupdate',
    username: 'mom',
    password: 'lkjsdfsod',
    remoteStart: 'node/2',
    localStart: '',
    localBaseURL: '%ALLUSERSPROFILE%\\cdp\\common\\',
    alerts: null,
    updatelog: 'common.update.xml',
    branch: '2.0',
    LURL: '%ALLUSERSPROFILE%\\cdp\\snapback\\apps\\common\\common.xml',
    RURL: 'http://snapback-apps.com/common/common.xml',
    status: 'development-snapshot'
}
;

$.common_config.baseURL = $.common_config.RURL;
$.common_config.baseURL = "http://" + $.common_config.baseURL.substring($.common_config.baseURL.indexOf('@') + 1, $.common_config.baseURL.lastIndexOf('/'));
$.common_config.baseURL = $.common_config.baseURL.substring(0, $.common_config.baseURL.lastIndexOf('/') - 9);
$.common_config.alerts = $.common_config.baseURL + 'feed.xml';
