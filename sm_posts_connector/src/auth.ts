const clientIdProperty = 'clientId';
const emailProperty = 'email';

const resetAuth = () =>
    PropertiesService.getUserProperties()
        .deleteProperty(clientIdProperty)
        .deleteProperty(emailProperty);

// TODO: Check this against the auth endpoint?
const isAuthValid = () =>
    !!(
        PropertiesService.getUserProperties().getProperty(clientIdProperty) &&
        PropertiesService.getUserProperties().getProperty(emailProperty)
    );

const getAuthType = () => {
    const cc = DataStudioApp.createCommunityConnector();

    return cc.newAuthTypeResponse().setAuthType(cc.AuthType.USER_TOKEN).build();
};

interface SetCredentialsInput {
    userToken: {
        username: string;
        token: string;
    };
}

const setCredentials = ({
    userToken: { username, token },
}: SetCredentialsInput) =>
    PropertiesService.getUserProperties().setProperties({
        [clientIdProperty]: token,
        [emailProperty]: username,
    });
