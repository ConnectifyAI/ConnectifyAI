export const modelTypes = {
	'audio-classification': {
		inputs: [
			{
				label: 'audio.wav',
				dtype: 'audio'
			}
		],
		outputs: [
			{
				//TODO: fix this later
				label: 'Up',
				dtype: 'number'
			},
			{
				//TODO: fix this later {this is very wrong
				//}
				label: 'Down',
				dtype: 'number'
			}
		]
	},
	'audio-to-audio': {
		inputs: [
			{
				label: 'input.wav',
				dtype: 'audio'
			}
		],
		outputs: [
			{
				label: 'label-0.wav',
				dtype: 'audio'
			},
			{
				label: 'label-1.wav',
				dtype: 'audio'
			}
		]
	},

	'automatic-speech-recognition': {
		inputs: [
			{
				label: 'input.flac',
				dtype: 'audio'
			}
		],
		outputs: [
			{
				label: 'Transcript',
				dtype: 'string'
			}
		]
	},

	'chat-completion': {
		//TODO: work on it xd
	},
	'depth-estimation': {
		inputs: [
			{
				label: 'depth-estimation-input.jpg',
				dtype: 'img'
			}
		],
		outputs: [
			{
				label: 'depth-estimation-output.png',
				dtype: 'img'
			}
		]
	},
	'document-question-answering': {
		inputs: [
			{
				label: 'Question',
				dtype: 'string'
			},
			{
				label: 'Input Image',
				dtype: 'img'
			}
		],
		outputs: [
			{
				label: 'Answer',
				content: 'Balance cost efficiency with quality customer service',
				dtype: 'string'
			}
		]
	},

	//TODO: this has weird things
	// "feature-extraction": {
	//     inputs: [
	//         {
	//             label: "Input",
	//             dtype: "string",
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
	//             dtype: "tabular",
	//         },
	//     ],
	// },

	//TODO: this has some other weird things
	// "fill-mask": {
	//     inputs: [
	//         {
	//             label: "Input",
	//             dtype: "string",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             dtype: "chart",
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
	//             dtype: "string",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             dtype: "chart",
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
	// "image-classification": {
	//     inputs: [
	//         {
	//             label: "image-classification-input.jpeg",
	//             dtype: "img",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             dtype: "chart",
	//             data: [
	//                 {
	//                     label: "Egyptian cat",
	//                     score: 0.514,
	//                 },
	//                 {
	//                     label: "Tabby cat",
	//                     score: 0.193,
	//                 },
	//                 {
	//                     label: "Tiger cat",
	//                     score: 0.068,
	//                 },
	//             ],
	//         },
	//     ],
	// },

	//TODO: More table stuff
	// "image-feature-extraction": {
	//     inputs: [
	//         {
	//             label: "mask-generation-input.png",
	//             dtype: "img",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             table: [
	//                 ["Dimension 1", "Dimension 2", "Dimension 3"],
	//                 ["0.21236686408519745", "1.0919708013534546", "0.8512550592422485"],
	//                 ["0.809657871723175", "-0.18544459342956543", "-0.7851548194885254"],
	//                 ["1.3103108406066895", "-0.2479034662246704", "-0.9107287526130676"],
	//                 ["1.8536205291748047", "-0.36419737339019775", "0.09717650711536407"],
	//             ],
	//             dtype: "tabular",
	//         },
	//     ],
	// },
	//
	'image-segmentation': {
		inputs: [
			{
				label: 'image-segmentation-input.jpeg',
				dtype: 'img'
			}
		],
		outputs: [
			{
				label: 'image-segmentation-output.png',
				dtype: 'img'
			}
		]
	},

	'image-to-image': {
		inputs: [
			{
				label: 'image-to-image-input.jpeg',
				dtype: 'img'
			}
		],
		outputs: [
			{
				label: 'image-to-image-output.png',
				dtype: 'img'
			}
		]
	},

	'image-to-string': {
		inputs: [
			{
				label: 'Input Image',
				dtype: 'img'
			}
		],

		outputs: [
			{
				label: 'Detailed description',
				dtype: 'string'
			}
		]
	},

	'image-generation': {
		inputs: [
			{
				label: 'mask-generation-input.png',
				dtype: 'img'
			}
		],
		outputs: [
			{
				label: 'mask-generation-output.png',
				dtype: 'img'
			}
		]
	},

	'mask-generation': {
		inputs: [
			{
				label: 'mask-generation-input.png',
				dtype: 'img'
			}
		],
		outputs: [
			{
				label: 'mask-generation-output.png',
				dtype: 'img'
			}
		]
	},

	'object-detection': {
		inputs: [
			{
				label: 'object-detection-input.jpg',
				dtype: 'img'
			}
		],
		outputs: [
			{
				label: 'object-detection-output.jpg',
				dtype: 'img'
			}
		]
	},
	'question-answering': {
		inputs: [
			{
				label: 'Question',
				dtype: 'string'
			},
			{
				label: 'Context',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'Answer',
				dtype: 'string'
			}
		]
	},
	'reinforcement-learning': {
		inputs: [
			{
				label: 'State',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'Action',
				dtype: 'string'
			},
			{
				label: 'Next State',
				dtype: 'string'
			}
		]
	},
	//TODO: chart dtype again ( cringe! )
	'sentence-similarity': {
		inputs: [
			{
				label: 'Source sentence',
				dtype: 'string'
			},
			{
				label: 'Sentences to compare to',
				dtype: 'string'
			},
			{
				label: '',
				dtype: 'string'
			},
			{
				label: '',
				dtype: 'string'
			}
		],
		outputs: [
			{
				dtype: 'chart',
				data: [
					{
						label: 'Deep learning is so straightforward.',
						score: 0.623
					},
					{
						label: 'This is so difficult, like rocket science.',
						score: 0.413
					},
					{
						label: "I can't believe how much I struggled with this.",
						score: 0.256
					}
				]
			}
		]
	},
	summarization: {
		inputs: [
			{
				label: 'Input',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'Output',
				dtype: 'string'
			}
		]
	},
	//TODO: Weird format!!!
	// "table-question-answering": {
	//     inputs: [
	//         {
	//             table: [
	//                 ["Rank", "Name", "No.of reigns", "Combined days"],
	//                 ["1", "lou Thesz", "3", "3749"],
	//                 ["2", "Ric Flair", "8", "3103"],
	//                 ["3", "Harley Race", "7", "1799"],
	//             ],
	//             dtype: "tabular",
	//         },
	//
	//         { label: "Question", content: "What is the number of reigns for Harley Race?", dtype: "string" },
	//     ],
	//     outputs: [{ label: "Result", content: "7", dtype: "string" }],
	// },
	//
	// //TODO: weird tables again
	// "tabular-classification": {
	//     inputs: [
	//         {
	//             table: [
	//                 ["Glucose", "Blood Pressure ", "Skin Thickness", "Insulin", "BMI"],
	//                 ["148", "72", "35", "0", "33.6"],
	//                 ["150", "50", "30", "0", "35.1"],
	//                 ["141", "60", "29", "1", "39.2"],
	//             ],
	//             dtype: "tabular",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             table: [["Diabetes"], ["1"], ["1"], ["0"]],
	//             dtype: "tabular",
	//         },
	//     ],
	// },
	//
	// //TODO: weird tables again
	// "tabular-regression": {
	//     inputs: [
	//         {
	//             table: [
	//                 ["Car Name", "Horsepower", "Weight"],
	//                 ["ford torino", "140", "3,449"],
	//                 ["amc hornet", "97", "2,774"],
	//                 ["toyota corolla", "65", "1,773"],
	//             ],
	//             dtype: "tabular",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             table: [["MPG (miles per gallon)"], ["17"], ["18"], ["31"]],
	//             dtype: "tabular",
	//         },
	//     ],
	// },
	// //TODO: chart dtype again
	// "text-classifiction": {
	//     inputs: [
	//         {
	//             label: "Input",
	//             dtype: "string",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             dtype: "chart",
	//             data: [
	//                 {
	//                     label: "POSITIVE",
	//                     score: 0.9,
	//                 },
	//                 {
	//                     label: "NEUTRAL",
	//                     score: 0.1,
	//                 },
	//                 {
	//                     label: "NEGATIVE",
	//                     score: 0.0,
	//                 },
	//             ],
	//         },
	//     ],
	// },
	'text-generation': {
		inputs: [
			{
				label: 'Input',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'Output',
				dtype: 'string'
			}
		]
	},
	'text-to-audio': {
		inputs: [
			{
				label: 'Input',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'Audio',
				dtype: 'audio'
			}
		]
	},
	'text-to-image': {
		inputs: [
			{
				label: 'Input',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'image.jpeg',
				dtype: 'img'
			}
		]
	},
	'text-to-speech': {
		inputs: [
			{
				label: 'Input',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'audio.wav',
				dtype: 'audio'
			}
		]
	},
	'text-to-video': {
		inputs: [
			{
				label: 'Input',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'string-to-video-output.gif',
				dtype: 'img'
			}
		]
	},

	'text2text-generation': {
		inputs: [
			{
				label: 'Input Text',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'Generated Text',
				dtype: 'string'
			}
		]
	},

	//TODO: this is weird
	// "token-classification": {
	//     inputs: [
	//         {
	//             label: "Input",
	//             dtype: "string",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             string: "My name is Omar and I live in Zürich.",
	//             tokens: [
	//                 {
	//                     dtype: "PERSON",
	//                     start: 11,
	//                     end: 15,
	//                 },
	//                 {
	//                     dtype: "GPE",
	//                     start: 30,
	//                     end: 36,
	//                 },
	//             ],
	//             dtype: "string-with-tokens",
	//         },
	//     ],
	// },
	translation: {
		inputs: [
			{
				label: 'Input',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'Output',
				dtype: 'string'
			}
		]
	},
	'unconditional-image-generation': {
		inputs: [
			{
				label: 'Seed',
				dtype: 'string'
			},
			{
				label: 'Number of images to generate:',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'unconditional-image-generation-output.jpeg',
				dtype: 'img'
			}
		]
	},
	//TODO: this is also weird
	// "video-classification": {
	//     inputs: [
	//         {
	//             label: "video-classification-input.gif",
	//             dtype: "img",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             dtype: "chart",
	//             data: [
	//                 {
	//                     label: "Playing Guitar",
	//                     score: 0.514,
	//                 },
	//                 {
	//                     label: "Playing Tennis",
	//                     score: 0.193,
	//                 },
	//                 {
	//                     label: "Cooking",
	//                     score: 0.068,
	//                 },
	//             ],
	//         },
	//     ],
	// },
	//TODO: Another chart one
	// "visual-question-answering": {
	//     inputs: [
	//         {
	//             label: "elephant.jpeg",
	//             dtype: "img",
	//         },
	//         {
	//             label: "Question",
	//             dtype: "string",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             dtype: "chart",
	//             data: [
	//                 {
	//                     label: "elephant",
	//                     score: 0.97,
	//                 },
	//                 {
	//                     label: "elephants",
	//                     score: 0.06,
	//                 },
	//                 {
	//                     label: "animal",
	//                     score: 0.003,
	//                 },
	//             ],
	//         },
	//     ],
	// },

	//TODO: Another chart thing
	// "zero-shot-classification": {
	//     inputs: [
	//         {
	//             label: "Text Input",
	//             dtype: "string",
	//         },
	//         {
	//             label: "Candidate Labels",
	//             dtype: "string",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             dtype: "chart",
	//             data: [
	//                 {
	//                     label: "CINEMA",
	//                     score: 0.9,
	//                 },
	//                 {
	//                     label: "ART",
	//                     score: 0.1,
	//                 },
	//                 {
	//                     label: "MUSIC",
	//                     score: 0.0,
	//                 },
	//             ],
	//         },
	//     ],
	// },
	//
	// //TODO: another chart
	// "zero-shot-image-classification": {
	//     inputs: [
	//         {
	//             label: "image-classification-input.jpeg",
	//             dtype: "img",
	//         },
	//         {
	//             label: "Classes",
	//             dtype: "string",
	//         },
	//     ],
	//     outputs: [
	//         {
	//             dtype: "chart",
	//             data: [
	//                 {
	//                     label: "Cat",
	//                     score: 0.664,
	//                 },
	//                 {
	//                     label: "Dog",
	//                     score: 0.329,
	//                 },
	//                 {
	//                     label: "Bird",
	//                     score: 0.008,
	//                 },
	//             ],
	//         },
	//     ],
	// },
	// hopefully these are all right
	'zero-shot-object-detection': {
		inputs: [
			{
				label: 'zero-shot-object-detection-input.jpg',
				dtype: 'img'
			},
			{
				label: 'Classes',
				dtype: 'string'
			}
		],
		outputs: [
			{
				label: 'zero-shot-object-detection-output.jpg',
				dtype: 'img'
			}
		]
	}
}
