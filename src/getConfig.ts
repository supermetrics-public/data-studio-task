const getConfig = () => {
    const cc = DataStudioApp.createCommunityConnector();

    const config = cc.getConfig();

    // Add name input
    config
        .newTextInput()
        .setId('name')
        .setName('Name')
        .setHelpText('Your name for registering with the API')
        .setAllowOverride(true);

    // Add email input
    config
        .newTextInput()
        .setId('email')
        .setName('Email')
        .setHelpText('Your email for registering with the API')
        .setAllowOverride(true);

    // Add an input for specifying a maximum number of posts to retrieve
    config
        .newSelectMultiple()
        .setId('postLimit')
        .setName('Post limit')
        .setHelpText(
            'Maximum number of posts that will be fetched from the API'
        )
        .addOption(config.newOptionBuilder().setValue('100').setLabel('100'))
        .addOption(config.newOptionBuilder().setValue('1000').setLabel('1000'))
        .addOption(
            config.newOptionBuilder().setValue('10000').setLabel('10000')
        )
        .setAllowOverride(true);

    return config.build();
};
