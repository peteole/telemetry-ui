# Telemetry UI for RC planes

Demo: https://peteole.github.io/telemetry-ui/

This is a web frontend for displaying telemetry data from an RC plane. It is built with React.
To work it must consume data from a data source. This must be an instance of the following websocket server at the moment:
https://github.com/peteole/websocketGroundstation

It may make sense to add support for a WebUSB datasource in the future.
You can also sent text messages to the RC plane using the terminal.