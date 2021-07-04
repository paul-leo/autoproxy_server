var PROXYS = {
    outter: "DIRECT",//在外网用于翻墙
    dev: "__DEV_PROXY__",//开启charles 用于调试
    inner: "DIRECT",//在内网用于访问外网
    direct: "DIRECT"
  }
  var urlRegs = {
    inner: /(\.pajk-ent)|(paic\.com\.cn)/,
    local: /(127\.0\.0\.1)|(localhost)|(192\.168)/,
    dev: /test\.pajkdc/
  }
  var isCompanyWifi = dnsResolve("paic.com.cn") || dnsResolve("pajk-ent.com")
  var isCompanyInnerNet = dnsResolve("paic.com.cn");
  
  function getUrlType(url) {
    for (var i in urlRegs) {
      if (urlRegs[i].test(url)) {
        return i;
      }
    }
    return 'internet';
  }
  
  function FindProxyForURL(url, host) {
    let urlType = getUrlType(url);
    if (urlType === 'inner' || urlType === 'local') {
      return PROXYS.direct;
    }
    if (urlType === 'dev') {
      return PROXYS.dev;
    }
    return isCompanyInnerNet ? PROXYS.inner : PROXYS.outter
  }