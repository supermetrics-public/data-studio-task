const cc = DataStudioApp.createCommunityConnector();

const getData = (request: unknown) => {
    let fields = cc.getFields();
    const fieldIds = request.fields.map((field) => field.name);
    const { postLimit = null } = request.configParams;

    fieldIds.forEach((fieldId) => {
        fields = _getField(fields, fieldId);
    });

    const requestOptions = {
        muteHttpExceptions: true,
        method: 'get',
    };

    const slToken = _getSlToken(request);
    const httpResponse = UrlFetchApp.fetch(
        `https://api.supermetrics.com/assignment/posts?sl_token=${slToken}`,
        requestOptions
    );
    const statusCode = httpResponse.getResponseCode();

    if (statusCode !== 200) {
        Logger.log('An exception occurred accessing the posts API:');
        Logger.log(statusCode);
        Logger.log(httpResponse.getAllHeaders());
        Logger.log(httpResponse.getContentText());
        _sendUserError(
            `The API replied with an unsuccessful status code of ${statusCode}`
        );

        return;
    }

    const { data = {} } = JSON.parse(httpResponse.getContentText()) || {};

    const posts = data.posts || [];
    const filteredPosts = postLimit ? posts.slice(0, postLimit) : posts;
    const normalizedPosts = filteredPosts.map((post) => ({
        values: fieldIds.map((fieldId) => _getDataField(post, fieldId)),
    }));

    const result = {
        schema: fields.build(),
        rows: normalizedPosts,
        filtersApplied: false,
    };

    Logger.log('getData finished with: ');
    Logger.log(result);

    return result;
};

const _getSlToken = (request) => {
    const { name, email } = request.configParams;
    const requestOptions = {
        muteHttpExceptions: true,
        method: 'post',
        payload: {
            client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
            email: email,
            name: name,
        },
    };

    const httpResponse = UrlFetchApp.fetch(
        'https://api.supermetrics.com/assignment/register',
        requestOptions
    );
    const statusCode = httpResponse.getResponseCode();

    if (statusCode !== 200) {
        Logger.log('An exception occurred accessing the register API:');
        Logger.log(statusCode);
        Logger.log(httpResponse.getAllHeaders());
        Logger.log(httpResponse.getContentText());
        _sendUserError(
            `The API replied with an unsuccessful status code of ${statusCode}`
        );

        return;
    }

    const { data = {} } = JSON.parse(httpResponse.getContentText()) || {};

    return data.sl_token;
};

const _sendUserError = (message) => {
    cc.newUserError().setText(message).throwException();
};

const _getDataField = (post, fieldId) => {
    switch (fieldId) {
        case 'userName':
            return post.from_name;
        case 'postLength':
            return (post.message || '').length;
        default:
            throw new Error(`Invalid fieldId: ${fieldId}`);
    }
};
