import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoDbConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    //  ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) =>
  'mongodb://docker:mongopw@localhost:49153';
//todo fix mdb connect
//todo fix mdb connect
//todo fix mdb connect
//todo fix mdb connect

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
