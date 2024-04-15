
export const modelTypes = {
    "audio-classification": {
        inputs: [
            {
                label: "audio.wav",
                type: "audio",
            },
        ],
        outputs: [
            {
                //TODO: fix this later
                label: "Up",
                type: "number"
            },
            {
                //TODO: fix this later {this is very wrong
                //}
                label: "Down",
                type: "number"
            },
        ],
    },
    "audio-to-audio": {
        inputs: [
            {
                label: "input.wav",
                type: "audio",
            },
        ],
        outputs: [
            {
                label: "label-0.wav",
                type: "audio",
            },
            {
                label: "label-1.wav",
                type: "audio",
            },
        ],
    },

    "automatic-speech-recognition": {
        inputs: [
            {
                label: "input.flac",
                type: "audio",
            },
        ],
        outputs: [
            {
                label: "Transcript",
                type: "string",
            },
        ],
    },


    "chat-completion": {
        //TODO: work on it xd
    },
    "depth-estimation": {
        inputs: [
            {
                label: "depth-estimation-input.jpg",
                type: "img",
            },
        ],
        outputs: [
            {
                label: "depth-estimation-output.png",
                type: "img",
            },
        ],
    },
    "document-question-answering": {
        inputs: [
            {
                label: "Question",
                type: "string",
            },
            {
                label: "Input Image",
                type: "img",
            },
        ],
        outputs: [
            {
                label: "Answer",
                content: "Balance cost efficiency with quality customer service",
                type: "string",
            },
        ],
    },

    //TODO: this has weird things
    // "feature-extraction": {
    //     inputs: [
    //         {
    //             label: "Input",
    //             type: "string",
    //         },
    //     ],
    //     outputs: [
    //         {
    //             table: [
    //                 ["Dimension 1", "Dimension 2", "Dimension 3"],
    //                 ["2.583383083343506", "2.757075071334839", "0.9023529887199402"],
    //                 ["8.29393482208252", "1.1071064472198486", "2.03399395942688"],
    //                 ["-0.7754912972450256", "-1.647324562072754", "-0.6113331913948059"],
    //                 ["0.07087723910808563", "1.5942802429199219", "1.4610432386398315"],
    //             ],
    //             type: "tabular",
    //         },
    //     ],
    // },

    //TODO: this has some other weird things
    // "fill-mask": {
    //     inputs: [
    //         {
    //             label: "Input",
    //             type: "string",
    //         },
    //     ],
    //     outputs: [
    //         {
    //             type: "chart",
    //             data: [
    //                 {
    //                     label: "wolf",
    //                     score: 0.487,
    //                 },
    //                 {
    //                     label: "dog",
    //                     score: 0.061,
    //                 },
    //                 {
    //                     label: "cat",
    //                     score: 0.058,
    //                 },
    //                 {
    //                     label: "fox",
    //                     score: 0.047,
    //                 },
    //                 {
    //                     label: "squirrel",
    //                     score: 0.025,
    //                 },
    //             ],
    //         },
    //     ], nputs: [
    //         {
    //             label: "Input",
    //             content: "The <mask> barked at me",
    //             type: "string",
    //         },
    //     ],
    //     outputs: [
    //         {
    //             type: "chart",
    //             data: [
    //                 {
    //                     label: "wolf",
    //                     score: 0.487,
    //                 },
    //                 {
    //                     label: "dog",
    //                     score: 0.061,
    //                 },
    //                 {
    //                     label: "cat",
    //                     score: 0.058,
    //                 },
    //                 {
    //                     label: "fox",
    //                     score: 0.047,
    //                 },
    //                 {
    //                     label: "squirrel",
    //                     score: 0.025,
    //                 },
    //             ],
    //         },
    //     ],
    // },

    //TODO: figure out later
    "image-classification": {
        inputs: [
            {
                label: "image-classification-input.jpeg",
                type: "img",
            },
        ],
        outputs: [
            {
                type: "chart",
                data: [
                    {
                        label: "Egyptian cat",
                        score: 0.514,
                    },
                    {
                        label: "Tabby cat",
                        score: 0.193,
                    },
                    {
                        label: "Tiger cat",
                        score: 0.068,
                    },
                ],
            },
        ],
    },

    //TODO: More table stuff
    "image-feature-extraction": {
        inputs: [
            {
                label: "mask-generation-input.png",
                type: "img",
            },
        ],
        outputs: [
            {
                table: [
                    ["Dimension 1", "Dimension 2", "Dimension 3"],
                    ["0.21236686408519745", "1.0919708013534546", "0.8512550592422485"],
                    ["0.809657871723175", "-0.18544459342956543", "-0.7851548194885254"],
                    ["1.3103108406066895", "-0.2479034662246704", "-0.9107287526130676"],
                    ["1.8536205291748047", "-0.36419737339019775", "0.09717650711536407"],
                ],
                type: "tabular",
            },
        ],
    },

    "image-segmentation": {
        inputs: [
            {
                label: "image-segmentation-input.jpeg",
                type: "img",
            },
        ],
        outputs: [
            {
                label: "image-segmentation-output.png",
                type: "img",
            },
        ],
    },

    "image-to-image": {
        inputs: [
            {
                label: "image-to-image-input.jpeg",
                type: "img",
            },
        ],
        outputs: [
            {
                label: "image-to-image-output.png",
                type: "img",
            },
        ],
    },

    "image-to-string": {
        inputs: [
            {
                label: "Input Image",
                type: "img",
            },
        ],

        outputs: [
            {
                label: "Detailed description",
                type: "string",
            },
        ],
    },

    "image-generation": {
        inputs: [
            {
                label: "mask-generation-input.png",
                type: "img",
            },
        ],
        outputs: [
            {
                label: "mask-generation-output.png",
                type: "img",
            },
        ],
    },

    "mask-generation": {
        inputs: [
            {
                label: "mask-generation-input.png",
                type: "img",
            },
        ],
        outputs: [
            {
                label: "mask-generation-output.png",
                type: "img",
            },
        ],
    },

    "object-detection": {
        inputs: [
            {
                label: "object-detection-input.jpg",
                type: "img",
            },
        ],
        outputs: [
            {
                label: "object-detection-output.jpg",
                type: "img",
            },
        ],
    },
    "question-answering": {
        inputs: [
            {
                label: "Question",
                type: "string",
            },
            {
                label: "Context",
                type: "string",
            },
        ],
        outputs: [
            {
                label: "Answer",
                type: "string",
            },
        ],
    },
    "reinforcement-learning": {
        inputs: [
            {
                label: "State",
                type: "string",
            },
        ],
        outputs: [
            {
                label: "Action",
                type: "string",
            },
            {
                label: "Next State",
                type: "string",
            },
        ],
    },
    //TODO: chart type again ( cringe! )
    "sentence-similarity": {
        inputs: [
            {
                label: "Source sentence",
                type: "string",
            },
            {
                label: "Sentences to compare to",
                type: "string",
            },
            {
                label: "",
                type: "string",
            },
            {
                label: "",
                type: "string",
            },
        ],
        outputs: [
            {
                type: "chart",
                data: [
                    {
                        label: "Deep learning is so straightforward.",
                        score: 0.623,
                    },
                    {
                        label: "This is so difficult, like rocket science.",
                        score: 0.413,
                    },
                    {
                        label: "I can't believe how much I struggled with this.",
                        score: 0.256,
                    },
                ],
            },
        ],
    },
    "summarization": {
        inputs: [
            {
                label: "Input",
                type: "string",
            },
        ],
        outputs: [
            {
                label: "Output",
                type: "string",
            },
        ],
    },
    //TODO: Weird format!!!
    "table-question-answering": {
        inputs: [
            {
                table: [
                    ["Rank", "Name", "No.of reigns", "Combined days"],
                    ["1", "lou Thesz", "3", "3749"],
                    ["2", "Ric Flair", "8", "3103"],
                    ["3", "Harley Race", "7", "1799"],
                ],
                type: "tabular",
            },

            { label: "Question", content: "What is the number of reigns for Harley Race?", type: "string" },
        ],
        outputs: [{ label: "Result", content: "7", type: "string" }],
    },

    //TODO: weird tables again
    "tabular-classification": {
        inputs: [
            {
                table: [
                    ["Glucose", "Blood Pressure ", "Skin Thickness", "Insulin", "BMI"],
                    ["148", "72", "35", "0", "33.6"],
                    ["150", "50", "30", "0", "35.1"],
                    ["141", "60", "29", "1", "39.2"],
                ],
                type: "tabular",
            },
        ],
        outputs: [
            {
                table: [["Diabetes"], ["1"], ["1"], ["0"]],
                type: "tabular",
            },
        ],
    },

    //TODO: weird tables again
    "tabular-regression": {
        inputs: [
            {
                table: [
                    ["Car Name", "Horsepower", "Weight"],
                    ["ford torino", "140", "3,449"],
                    ["amc hornet", "97", "2,774"],
                    ["toyota corolla", "65", "1,773"],
                ],
                type: "tabular",
            },
        ],
        outputs: [
            {
                table: [["MPG (miles per gallon)"], ["17"], ["18"], ["31"]],
                type: "tabular",
            },
        ],
    },
    //TODO: chart type again
    "string-classifiction": {
        inputs: [
            {
                label: "Input",
                type: "string",
            },
        ],
        outputs: [
            {
                type: "chart",
                data: [
                    {
                        label: "POSITIVE",
                        score: 0.9,
                    },
                    {
                        label: "NEUTRAL",
                        score: 0.1,
                    },
                    {
                        label: "NEGATIVE",
                        score: 0.0,
                    },
                ],
            },
        ],
    },
    "string-generation": {
        inputs: [
            {
                label: "Input",
                type: "string",
            },
        ],
        outputs: [
            {
                label: "Output",
                type: "string",
            },
        ],
    },
    "string-to-audio": {
        inputs: [
            {
                label: "Input",
                type: "string"
            }
        ],
        outputs: [
            {
                label: "Audio",
                type: "audio"
            }
        ]
    },
    "string-to-image": {
        inputs: [
            {
                label: "Input",
                type: "string",
            },
        ],
        outputs: [
            {
                label: "image.jpeg",
                type: "img",
            },
        ],
    },
    "string-to-speech": {
        inputs: [
            {
                label: "Input",
                type: "string",
            },
        ],
        outputs: [
            {
                label: "audio.wav",
                type: "audio",
            },
        ],
    },
    "string-to-video": {
        inputs: [
            {
                label: "Input",
                type: "string",
            },
        ],
        outputs: [
            {
                label: "string-to-video-output.gif",
                type: "img",
            },
        ],
    },
    "text2text-generation": {
        inputs: [
            {
                label: "Input Text",
                type: "string"
            }
        ],
        outputs: [
            {
                label: "Generated Text",
                type: "string"
            }
        ]
    },

    //TODO: this is weird
    "token-classification": {
        inputs: [
            {
                label: "Input",
                type: "string",
            },
        ],
        outputs: [
            {
                string: "My name is Omar and I live in Zürich.",
                tokens: [
                    {
                        type: "PERSON",
                        start: 11,
                        end: 15,
                    },
                    {
                        type: "GPE",
                        start: 30,
                        end: 36,
                    },
                ],
                type: "string-with-tokens",
            },
        ],
    },
    "translation": {
        inputs: [
            {
                label: "Input",
                type: "string",
            },
        ],
        outputs: [
            {
                label: "Output",
                type: "string",
            },
        ],
    },
    "unconditional-image-generation": {
        inputs: [
            {
                label: "Seed",
                type: "string",
            },
            {
                label: "Number of images to generate:",
                type: "string",
            },
        ],
        outputs: [
            {
                label: "unconditional-image-generation-output.jpeg",
                type: "img",
            },
        ],
    },
    //TODO: this is also weird
    "video-classification": {
        inputs: [
            {
                label: "video-classification-input.gif",
                type: "img",
            },
        ],
        outputs: [
            {
                type: "chart",
                data: [
                    {
                        label: "Playing Guitar",
                        score: 0.514,
                    },
                    {
                        label: "Playing Tennis",
                        score: 0.193,
                    },
                    {
                        label: "Cooking",
                        score: 0.068,
                    },
                ],
            },
        ],
    },
    //TODO: Another chart one
    "visual-question-answering": {
        inputs: [
            {
                label: "elephant.jpeg",
                type: "img",
            },
            {
                label: "Question",
                type: "string",
            },
        ],
        outputs: [
            {
                type: "chart",
                data: [
                    {
                        label: "elephant",
                        score: 0.97,
                    },
                    {
                        label: "elephants",
                        score: 0.06,
                    },
                    {
                        label: "animal",
                        score: 0.003,
                    },
                ],
            },
        ],
    },
    //TODO: Another chart thing
    "zero-shot-classification": {
        inputs: [
            {
                label: "Text Input",
                type: "string",
            },
            {
                label: "Candidate Labels",
                type: "string",
            },
        ],
        outputs: [
            {
                type: "chart",
                data: [
                    {
                        label: "CINEMA",
                        score: 0.9,
                    },
                    {
                        label: "ART",
                        score: 0.1,
                    },
                    {
                        label: "MUSIC",
                        score: 0.0,
                    },
                ],
            },
        ],
    },

    //TODO: another chart
    "zero-shot-image-classification": {
        inputs: [
            {
                label: "image-classification-input.jpeg",
                type: "img",
            },
            {
                label: "Classes",
                type: "string",
            },
        ],
        outputs: [
            {
                type: "chart",
                data: [
                    {
                        label: "Cat",
                        score: 0.664,
                    },
                    {
                        label: "Dog",
                        score: 0.329,
                    },
                    {
                        label: "Bird",
                        score: 0.008,
                    },
                ],
            },
        ],
    },
    // hopefully these are all right
    "zero-shot-object-detection": {
        inputs: [
            {
                label: "zero-shot-object-detection-input.jpg",
                type: "img",
            },
            {
                label: "Classes",
                type: "string",
            },
        ],
        outputs: [
            {
                label: "zero-shot-object-detection-output.jpg",
                type: "img",
            },
        ],
    }





}

