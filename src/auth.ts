const clientIdProperty = 'clientId';
const cc = DataStudioApp.createCommunityConnector();

const isAdminUser = () => {
    return true;
};

const resetAuth = () =>
    PropertiesService.getUserProperties().deleteProperty(clientIdProperty);

const isAuthValid = () =>
    !!PropertiesService.getUserProperties().getProperty(clientIdProperty);

const getAuthType = () => {
    return cc.newAuthTypeResponse().setAuthType(cc.AuthType.NONE).build();
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
