import { redirect } from "@sveltejs/kit";

export function redirector(status: number, path: string, message: string = "generic redirect") {
	// hand it off to /redirect
	return redirect(status, `/redirect?path=${path}&message=${message}`);
}
