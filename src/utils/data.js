export const routes = [
  {
    name: "Overview",
    route: "/overview",
  },
  {
    name: "Profile",
    route: "/profile",
  },
  {
    name: "Assessment Analytics",
    route: "/assessmentAnalytics",
  },
  { name: "Dealer Performance", route: "/dealerPerformance" },
  {
    name: "Question Analytics",
    route: "/questionAnalytics",
  },
  {
    name: "Category wise report",
    route: "/categoryWiseReport",
  },
  {
    name: "User performance",
    route: "/userPerformance",
  }
];

export const colors = ["#FF7575", "#C3BC00","#00CF50","#347BFF","#DD34FF","#FF7575", "#C3BC00","#00CF50","#347BFF","#DD34FF"];

export const overviewPageCards = [
  {
    text:"Total Number of Assessments Conducted",
    value:"1800"
  },
  {
    text:"Current active assessments",
    value:"150"
  },
  {
    text:"Average score rate across all assessments",
    value:"75%"
  },
  {
    text:"Overall pass rate",
    value:"63%"
  },
  {
    text:"Average Attempts per Assessment",
    value:"2.4"
  },
]

function createData(name, date, participants, rate, time) {
  return { name, date, participants, rate, time };
}

export const overviewTableRows = [
  createData("Sales Knowledge", "Aug 5th 2024", 1200, "24%", "22min"),
  createData("Product Training Level 1", "Aug 5th 2024", 800, "37%", "43min"),
  createData("Customer Service Skills Test", "Aug 5th 2024", 730, "24%", "60min"),
  createData("Technical Training Assessment", "Aug 5th 2024", 640, "67%", "45min"),
  createData("Product Training Level2", "Aug 5th 2024",1500, "49%", "39min"),
];
