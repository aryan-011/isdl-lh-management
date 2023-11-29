export const clubs = [
    { label: "Vignette ", value: "Vignette",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Media Cell", value: "Media Cell",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Sankalp", value: "Sankalp",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Aaveg", value: "Aaveg",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Imagination", value: "Imagination",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Rendition", value: "Rendition",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Quizzinga", value: "Quizzinga",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Capriccio", value: "Capriccio",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Eminence", value: "Eminence",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Literary Committe", value: "Literary Committe",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Insignia", value: "Insignia",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Cultural Council", value: "Cultural Council",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Sci-Tech Council", value: "Sci-Tech Council",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Presidential Council", value: "Presidential Council",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Cipher", value: "Cipher",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Cybros", value: "Cybros",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Phoenix", value: "Phoenix",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    { label: "Astronomy Club", value: "Astronomy Club",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
    // { label: "", value: "Club 1087",facultyMentorEmail:'21ucs018@lnmiit.ac.in' },
  ];
export const lt = [
    { label: "LT1", value: 1 },
    { label: "LT2", value: 2 },
    { label: "LT19", value: 19 },
  ];

export const options = {
	title: "Demo Title",
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	clearBtnText: "Clear",
	maxDate: new Date("2030-01-01"),
	minDate: new Date(),
	theme: {
		background: "dark:bg-[#374151]",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <span>&larr;</span>,
		next: () => <span>&rarr;</span>,
	},
	datepickerClassNames: "md:top-12 top-1/2 left-1/2 -translate-x-1/2 ",
	defaultDate: new Date(),
	language: "en",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}
