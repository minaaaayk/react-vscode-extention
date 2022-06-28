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
				vscode.Uri.file(path.join(context.extensionPath, "dist"))
			]
		});

		const reactAppPathOnDisk = vscode.Uri.file(
		path.join(context.extensionPath, "dist", "index.js")
		);
    	const reactAppUri = reactAppPathOnDisk.with({ scheme: "vscode-resource" });
		panel.webview.html = getWebviewContent(reactAppUri);



	}));
}

function getWebviewContent(reactAppUri:vscode.Uri): string {


    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Config View</title>

        <meta http-equiv="Content-Security-Policy"
              content="default-src 'none';
                      img-src https:;
                      script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
                      style-src vscode-resource: 'unsafe-inline';">

        <script>
          window.acquireVsCodeApi = acquireVsCodeApi;
        </script>
    </head>
    <body>
        <div id="root"></div>

        <script src="${reactAppUri}"></script>
    </body>
    </html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
