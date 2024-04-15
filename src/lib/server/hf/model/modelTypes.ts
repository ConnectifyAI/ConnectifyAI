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
                type: "text",
            },
        ],
    }



















    "image-to-text": {
        inputs: [
            {
                label: "Input Image",
                type: "img",
            },
        ],

        outputs: [
            {
                label: "Detailed description",
                type: "text",
            },
        ],
    },
    ""
}

