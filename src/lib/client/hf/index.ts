//NOTE: this is what a modelID looks like "albert/albert-base-v1"
export const fetchModel = async (modelId: string) => {

    //TODO: helper to convert modelID to searchable version
    //
    const testModelId = "albert/abert-base-v1"

    testModelId.replace("/", "%2")

    const response = await fetch(
        "https://huggingface.co/api/models?search=albert%2Falbert-base-v1&limit=5&full=true&config=true",
        {
            method: "GET",
            headers: {}
        }
    )

    console.log(await response.json())

}
