// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require('path');
import * as vscode from 'vscode';
import { getWebviewContent } from './getWebviewContent';
import { SidebarProvider } from './SidebarProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// console.log('Congratulations, your extension "react-vscode-extention" is now active!');
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
		"react-sidebar",
		sidebarProvider
		)
	);


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


// this method is called when your extension is deactivated
export function deactivate() {}
