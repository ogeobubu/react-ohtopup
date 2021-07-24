import {
  Dashboard,
  CreditCard,
  SimCard,
  Print,
  DataUsage,
  AccountCircle,
  People,
  AccountBalance,
  LocalAtm,
  Redeem,
  MonetizationOn,
  Receipt,
  WbIncandescent,
} from "@material-ui/icons";

const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard className="sidebarIcon" />,
  },
  {
    title: "Wallet",
    path: "/dashboard/wallet",
    icon: <CreditCard className="sidebarIcon" />,
  },
  {
    title: "Buy Airtime VTU",
    path: "/dashboard/airtime",
    icon: <SimCard className="sidebarIcon" />,
  },
  {
    title: "Print Recharge Card",
    path: "/dashboard/print",
    icon: <Print className="sidebarIcon" />,
  },
  {
    title: "Buy Data",
    path: "/dashboard/data",
    icon: <DataUsage className="sidebarIcon" />,
  },
  {
    title: "Pay Electricity",
    path: "/dashboard/electricity",
    icon: <WbIncandescent className="sidebarIcon" />,
  },
  {
    title: "Bills Payment",
    path: "/dashboard/bills",
    icon: <Receipt className="sidebarIcon" />,
  },
  {
    title: "Trade Bitcoin",
    path: "/dashboard/bitcoin",
    icon: <MonetizationOn className="sidebarIcon" />,
  },
  {
    title: "Redeem Gift Card",
    path: "/dashboard/gift",
    icon: <Redeem className="sidebarIcon" />,
  },
  {
    title: "Airtime to Cash",
    path: "/dashboard/airtime-to-cash",
    icon: <LocalAtm className="sidebarIcon" />,
  },
  {
    title: "My Transactions",
    path: "/dashboard/transactions",
    icon: <AccountBalance className="sidebarIcon" />,
  },
  {
    title: "My Referrals",
    path: "/dashboard/referrals",
    icon: <People className="sidebarIcon" />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <AccountCircle className="sidebarIcon" />,
  },
];

export default SidebarData;
