# Serverless POC

- Seguimos la guía de configuración oficial de [`serverless`](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#sign-up-for-an-aws-account)
- Instalamos serveless (lo he instalado de manera local con yarn add serverless)
- el archivo CSV de AWS, copiamos donde están los datos y ejecutamos:
  
  ```bash
  > node aws.js [PEGAR_TEXTO]
  ```

- obtenemos los parámetros formateados para poder agregarlos al siguiente comando.
- ejecutamos el siguiente comando para configurar las credenciales de aws con serveless:

```bash
> yarn serverless config credentials --provider aws --profile NOMBRE_PERFIL_CREADO --key CLAVE_DEL_PERFIL_CREADO --secret SECRETO_PERFIL_CREADO
```

- creamos el directorio donde estará el proyecto

```bash
> mkdir aws && cd $_
```

- copiamos la carpeta creada en `~/.aws`
  
  ```bash
  > cp -r ~/.aws ./
  ```

  Formato de ejemplo:

  ```md
  [temistocles]
    aws_access_key_id=XXXXXXXX
    aws_secret_access_key=YYYYYYYY

  [serverless-servicename-agent]
    aws_access_key_id=ZZZZZZZZZZ
    aws_secret_access_key=KKKK
  ```

- ejecutamos el comando:

```bash
> yarn serverless create --template aws-nodejs --name slspoc
```

> IMPORTANTE!
> Agregar la carpeta `.aws/` a `.gitignore`

Explicación YAML:

```yaml
service: slspoc # Nombre que le hemos dado al proyecto
frameworkVersion: "2" # Version de SLS

provider: # Config del Proveedor Cloud
  name: aws # nombre del proveedor
  runtime: nodejs12.x # versión de nodejs
  apiGateway: # AWS
    shouldStartNameWithService: true # Cambian convención, y así no sale warning
  stage: dev # indicamos el entorno en el que se despliega
  profile: serverless-servicename-agent # indicamos el profile que lo tiene que ejecutar, si tenemos más de uno

functions: # Declaración de cloud Functions
  hello: # Nombre del método que se expone
    handler: handler.hello # Función que se expone como lambda function
    events: # eventos que admite nuestra lambda functions
        - http: # servicio http que admite
            path: hello # Path del endpoint
            method: get # verbo http
```

- Los tres parámetros que siempre van a estar el las lambdas, event, context y callback. Aunque en nuestro ejemplo no se informan nada mas que uno, estos son los parámetros:

```js
'use strict';

exports.handler = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Go Serverless v1.0! Your function executed successfully!, Hello Word!',
          input: event,
        })
    });
    callback(null, response);
};
```

> event: objeto de evento del disparador le manda lambda
> context: contexto de ejecución
> callback (opcional): le envía una respuesta al disparador.

- Deploy nuestra lambda:

`yarn serverless deploy --aws-profile AGENT_PROFILE`

```bash
  > yarn serverless deploy --aws-profile serverless-servicename-agent
  yarn run v1.22.10
  $ [staffing]/node_modules/.bin/serverless deploy --aws-profile serverless-servicename-agent
  Serverless: Packaging service...
  Serverless: Excluding development dependencies...
  Serverless: Uploading CloudFormation file to S3...
  Serverless: Uploading artifacts...
  Serverless: Uploading service slspoc.zip file to S3 (34.95 MB)...
  Serverless: Validating template...
  Serverless: Updating Stack...
  Serverless: Checking Stack update progress...
  ..............
  Serverless: Stack update finished...
  Service Information
  service: slspoc
  stage: dev
  region: us-east-1
  stack: slspoc-dev
  resources: 11
  api keys:
    None
  endpoints:
    GET - https://a8eul32j7g.execute-api.us-east-1.amazonaws.com/dev/hello
  functions:
    hello: slspoc-dev-hello
  layers:
    None

  ********************************************************************************************************************************************
  Serverless: Announcing an enhanced experience for Serverless Full-Stack Applications: https://github.com/serverless-components/fullstack-app
  ********************************************************************************************************************************************

  ✨  Done in 66.22s.
```
