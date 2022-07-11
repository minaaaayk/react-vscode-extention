import path = require('path');
import * as vscode from 'vscode';

export function getWebviewContent(context:vscode.ExtensionContext, webview:vscode.Webview): string {
    // Use a nonce to only allow specific scripts to be run

    // const reactAppPathOnDisk = vscode.Uri.file(
    // path.join(context.extensionPath, "dist", "index.js")
    // );
    // const reactAppUri = reactAppPathOnDisk.with({ scheme: "vscode-resource" });

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "dist", "index.js")
    );

    // Uri to load (Local path to css styles) into webview
    const stylesResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "static","reset.css")
    );
    const stylesMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "static", "vscode.css")
    );


    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${stylesResetUri}" rel="stylesheet">
		<link href="${stylesMainUri}" rel="stylesheet">
     </head>
     <body>
        <div id="root"></div>
    </body>
    <script src="${scriptUri}"></script>
    </html>`;
}