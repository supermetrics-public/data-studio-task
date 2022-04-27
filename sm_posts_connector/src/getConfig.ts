const getConfig = (request: any) => {
    const cc = DataStudioApp.createCommunityConnector();

    const config = cc.getConfig();

    // Add an input for filtering post by user ID
    config
        .newTextInput()
        .setId('userFilter')
        .setName('User filter')
        .setHelpText('Filter posts to only users fuzzily matching this string')
        .setAllowOverride(true);

    return config.build();
};
