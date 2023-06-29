import { Container } from "@mui/material";
import { Typography, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import TotalOrder from "../../components/Order/TotalOrder";
import axios from "axios";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const apiKey = "zaHSAGHdplY7jwHh6nhD8w";
const tCode = "04";

const handleViewInvoice = async () => {
  await axios.post("http://info.sweettracker.co.kr/tracking/5", {
    t_key: apiKey,
    t_code: tCode,
    t_invoice: 654769511471,
  });
};
const OrderList = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ minHeight: "800px" }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="blue"
          gutterBottom
          paddingTop={10}
        >
          ORDER LIST
        </Typography>
        <Box sx={{ width: "100%", marginY: "90px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="주문내역" {...a11yProps(0)} />
              <Tab label="완료내역" {...a11yProps(1)} />
              <Tab label="교환내역" {...a11yProps(2)} />
              <Tab label="취소내역" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <TotalOrder />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Three
          </TabPanel>
        </Box>
      </Container>
    </>
  );
};

export default OrderList;
