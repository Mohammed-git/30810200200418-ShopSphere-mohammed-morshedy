import { http, HttpResponse } from "msw";

export const handlers = [

    http.get("/products", () => {

        return HttpResponse.json([
            {
                id: 1,
                name: "RTX 5090",
                price: 200000,
                category: "GPU"
            }
        ]);

    })

];