const clientIdProperty = 'clientId';

const resetAuth = () =>
    PropertiesService.getUserProperties().deleteProperty(clientIdProperty);

const isAuthValid = () =>
    !!PropertiesService.getUserProperties().getProperty(clientIdProperty);

const getAuthType = () => {
    const cc = DataStudioApp.createCommunityConnector();

    return cc.newAuthTypeResponse().setAuthType(cc.AuthType.USER_TOKEN).build();
};

interface SetCredentialsInput {
    key: string;
}

const setCredentials = ({ key }: SetCredentialsInput) => {
    PropertiesService.getUserProperties().setProperty(clientIdProperty, key);

    return {
        errorCode: !!key ? 'NONE' : 'INVALID_CREDENTIALS',
    };
};
