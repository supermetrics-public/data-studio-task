const cc = DataStudioApp.createCommunityConnector();
const types = cc.FieldType;
const aggregationType = cc.AggregationType;

const _getField = (fields, fieldId) => {
    switch (fieldId) {
        case 'userName':
            fields
                .newDimension()
                .setId('userName')
                .setName('User name')
                .setDescription('Name of user who made the post')
                .setType(types.TEXT);
            break;
        case 'postLength':
            fields
                .newMetric()
                .setId('postLength')
                .setName('Post length')
                .setDescription('Number of characters in the post')
                .setType(types.NUMBER)
                .setAggregation(aggregationType.AUTO);
            break;
        default:
            throw new Error(`Invalid fieldId: ${fieldId}`);
    }

    return fields;
};

const getSchema = (request) => {
    let fields = cc.getFields();

    ['userName', 'postLength'].forEach((fieldId) => {
        fields = _getField(fields, fieldId);
    });

    fields.setDefaultDimension('userName');
    fields.setDefaultMetric('postLength');

    return { schema: fields.build() };
};
