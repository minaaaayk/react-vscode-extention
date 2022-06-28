// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require('path');
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "react-vscode-extention" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('react-vscode-extention.viewconfig', () => {
		// vscode.window.showInformationMessage('Hello World from react-vscode-extention!');

		// Create and show panel
		const panel = vscode.window.createWebviewPanel(
			'reactWebView',
			'React WebView',
			vscode.ViewColumn.One,
			{
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.file(path.join(context.extensionPath, "dist")),
                    vscode.Uri.file(path.join(context.extensionPath, "static"))
                ]
		});

		panel.webview.html = getWebviewContent(context, panel.webview);
	}));
}

function getWebviewContent(context:vscode.ExtensionContext, webview:vscode.Webview): string {
    // Use a nonce to only allow specific scripts to be run

    const reactAppPathOnDisk = vscode.Uri.file(
    path.join(context.extensionPath, "dist", "index.js")
    );
    const reactAppUri = reactAppPathOnDisk.with({ scheme: "vscode-resource" });

    // Uri to load (Local path to css styles) into webview
    const stylesResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
      context.extensionUri,
      "static",
      "reset.css"
    ));
    const stylesMainUri = webview.asWebviewUri(vscode.Uri.joinPath(
      context.extensionUri,
      "static",
      "vscode.css"
    ));

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
        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
