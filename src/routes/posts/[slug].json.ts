import type { Locals } from "$lib/types";
import type { EndpointOutput, RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler<Locals> = async (request) => {
    // How to load local files?
	const response: EndpointOutput = { status: 200, body: { content: 'test worked!'} };

	if (response.status === 404) {
		return { body: {} };
	}

	return response;
};