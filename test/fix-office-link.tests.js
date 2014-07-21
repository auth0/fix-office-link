var assert = require('assert');
var fix_office_link = require('../index');

function assert_match (agent) {
  var req = {
    headers: {
      'user-agent': agent
    }
  };
  var response_headers = {};
  var content = '';
  var res = {
    set: function (key, value) {
      response_headers[key] = value;
    },
    send: function (c) {
      content = c;
    }
  };


  fix_office_link(req, res, function () {
    throw new Error('next should not be called for agent ' + agent);
  });

  assert.equal(content, "<html><head><meta http-equiv='refresh' content='0'/></head><body></body></html>",
      'Content response for user-agent ' + agent + ' is wrong: \n' + content);

  assert.equal(response_headers['Content-Type'], 'text/html');
}

function assert_no_match (agent) {
  var req = {
    headers: {
      'user-agent': agent
    }
  };

  var res = {
    set: function () {},
    send: function () {
      throw new Error('Tried to render a refresh page for agent: ' + agent + ' when it shouldnt.');
    }
  };

  fix_office_link(req, res, function () {});
}

// # Office 2011 on Mac
assert_match("Mozilla/5.0 (Macintosh; Intel Mac OS X) Word/14.20.0");
assert_match("Mozilla/5.0 (Macintosh; Intel Mac OS X) Excel/14.20.0");
assert_match("Mozilla/5.0 (Macintosh; Intel Mac OS X) PowerPoint/14.20.0");

// # some others on windows 7
assert_match("Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; ms-office)");

//should not match for any other browser
assert_no_match("aldsfjlkads asdljfjl Words");
assert_no_match("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.46 Safari/536.5");


console.log('all tests worked okay');