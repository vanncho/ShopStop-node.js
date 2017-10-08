const responses = {

    redirect: redirect,
    ok: ok,
    notFound: notFound
};

function redirect(resp) {

    resp.writeHead(302, {
        Location: '/'
    });
}

function ok(resp, contentType) {

    resp.writeHead(200, {
        'Content-Type': contentType || 'text/html'
    });
}

function notFound(resp) {

    resp.writeHead(404, {
        'Content-Type': 'text/html'
    });

    resp.write('404 Not Found!');
}

module.exports = responses;