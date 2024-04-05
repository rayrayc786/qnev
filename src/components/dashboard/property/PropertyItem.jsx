import { Link, useLocation } from "react-router-dom";
import { InlineWidget } from "react-calendly";
import {
  Box,
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
  styled,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  useMediaQuery,
  TextField
} from "@mui/material";
import PropTypes from 'prop-types';
import {  alpha} from '@mui/system';
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ToastContainer, toast } from "react-toastify";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Popup from 'reactjs-popup';
import jwtDecode from "jwt-decode";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import VerticalBarGraph from "./VerticalBarGraph";
import Period from "./Period";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../../config";
// import Slider from "react-slick";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ShowInterest from './ShowInterest'
// import { toast } from "react-toastify";
import ProgressBar from "@ramonak/react-progress-bar";
const Options = styled(Link)`
padding: 10px;
display: flex;
align-items: center;
font-size: 16px;
  border-radius: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  background-color: ${({ selected }) =>
  selected ? "#cbe5ffb9" : "transparent"};
  color: ${({ selected }) => (selected ? "black" : "rgb(112,111,111)")};
  &:hover {
    background-color: ${({ selected }) =>
    selected ? "#cbe5ffb9" : "#cbe5ffb9"};
    color: black;
  }
  `;
  const StyledPopup = styled(Popup)`
  &-overlay {
    height: 50%;
    width: 30%;
    margin-left: 33%;
    margin-top: 15%;
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(5px);
    border: 2px solid black;
    border-radius: 10px;

    @media (max-width: 600px) {
      width: 80%;
      margin-left: 10%;
      margin-top: 25%;
    }
  }

  &-content {
    color: white;
  }
`;
  const StyledPopupinv = styled(Popup)`
  &-overlay {
    height: 435px;
    width: 30%;
    margin-left: 33%;
    margin-top: 5%;
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(5px);
    border: 1px solid #e9e9eb;
    border-radius: 10px;

    @media (max-width: 600px) {
      width: 80%;
      margin-left: 10%;
      margin-top: 25%;
    }
  }

  &-content {
    color: white;
  }
`;
const StyledPopupinvSmall = styled(Popup)`
&-overlay {
  height: 460px;
  width: 30%;
  margin-left: 33%;
  margin-top: 5%;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(5px);
  border: 1px solid #e9e9eb;
  border-radius: 10px;

  @media (max-width: 600px) {
    width: 80%;
    margin-left: 10%;
    margin-top: 25%;
  }
}

&-content {
  color: white;
}
`;
const Label = styled(Box)`
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 0px;
`
const LabelName = styled(Typography)`
font-family: 'Inter';
font-size: 18px;
color: black;
`
const LabelAmount = styled(Typography)`
text-align:'center';
font-family: 'Inter';
align-items: center;
font-size: 32px;
font-weight: 600;
color:black;
`
const LabelSlider = styled('input')`
width: 100%;
cursor: pointer;
background-color: #0170dc;
border-radius: 10px;
height: 10px;
`

const HelpIcon = styled(ChatBubbleOutlineRoundedIcon)`
font-size: 25px;
margin-right: 10px;
color: ${({ selected }) => (selected ? "#0170dc" : "")};
`;

const Heading = styled(Typography)`
text-decoration: none;
font-family: Inter;
font-size: 18px;
`;
const arrow = ">";
const PropertyLink = styled(Link)`
text-decoration: none;
color: black;
margin-right: 10px;
font-weight: 600;
&:hover {
  text-decoration: underline;
}
`;
const Bookmark = styled(Button)`
text-transform: none;
color: black;
border: 2px solid black;
background-color: white;
padding: 10px 20px;
border-radius: 10px;
&:hover {
  color: white;
  background-color: #0170dc;
  border: 2px solid #0170dc;
}
&:hover path {
  color: white;
}
`;
const Extra = styled(Typography)`
font-family: "Inter";
font-size: 16px;
`;
const PhotoLink = styled(Link)`
color: black;
text-decoration: none;
&:hover {
  color: rgb(112, 111, 111);
}
`;
const SmallBoxes = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  `;
  const Details = styled(Box)`
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  `;
  const Pricing = styled(Box)`
  position: sticky;
  top: 20px;
  `;
  const CartButton = styled(Button)`
  background-color: #0170dc;
  color: white;
  font-family: "Inter";
  text-transform: none;
  font-size: 14px;
  padding: 7px;
  border-radius: 10px;
  &:hover {
    background-color: #0170dc;
    color: white;
  }
  `;
  const PriceAddButton = styled(Button)`
  background-color: #cbe5ffb9;
  color: black;
  font-size: 11px;
  width: 32%;
  font-weight: 600;
  border-radius: 10px;
  font-family: "Inter";
  &:hover {
    background-color: #0170dc;
    color: white;
  }
  `;
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "14px",
            fontFamily: "Inter",
            backgroundColor: "#121c30",
            textAlign: "center",
          },
        },
    },
  },
});
const info = (
  <>
    <p style={{ textAlign: "left", padding: "10px" }}>
      Use this calculator to estimate the potential returns from your real
      estate investment. Simply adjust the sliders to see how the variables will
      impact your estimated returns.
    </p>
    <p style={{ textAlign: "left", padding: "10px" }}>
      All projected values are before any property costs and platform fees, and
      based on a 5-year holding period. We expect the asset value to grow{" "}
      <b>30% over the next 5 years.</b>
    </p>
  </>
);
const info1 = (
  <p style={{ textAlign: "left", padding: "10px" }}>
    This rental income breakdown is based on estimated rental income, deductions
    and fees for the first year of ownership only. Please note that actual
    rental income, deductions, and fees may vary based on market conditions and
    future rental terms.
  </p>
);
const Logo = styled(Box)`
  width: 50px;
  height: 50px;
  padding: 4px 10px;
  margin-right: 10px;
  `;
  const SubTitle = styled(Typography)`
  color: black;
  font-size: 15px;
  font-family: "Inter";
  padding: 5px;
  `;
  const PropertyDetails = styled(Box)`
  display: flex;
  padding: 15px 0;
  align-items: center;
  `;
  const PropertyHeading = styled(Typography)`
  font-family: "Inter";
  font-weight: 600;
  font-size: 18px;
  `;
  const PropertyHeadingSmall = styled(Typography)`
  font-family: "Inter";
  font-weight: 600;
  font-size: 16px;
  width:80%;
  word-wrap: break-word;
  `;
  const PropertySubHeading = styled(Typography)`
  font-family: "Inter";
  font-size: 16px;
  color: grey;
  `;
  const GraphInfo = styled(Box)`
  display: flex;
  align-items: flex-start;
  `;
  const GraphHeading = styled(Typography)`
  font-size: 15px;
  color: grey;
  font-family: "Inter";
  `;
  const GraphSubHeading = styled(Typography)`
  font-size: 15px;
  font-weight: 600;
  font-family: "Inter";
  `;
  const MoreButton = styled(Typography)`
  font-family: "Inter";
  color: #0170dc;
  font-size: 16px;
  text-decoration: none;
  text-transform: none;
  cursor: pointer;
  padding: 0;
  &:hover {
    text-decoration: underline;
    background-color: white;
  }
  `;
  const FinanceHeading = styled(Typography)`
  font-family: "Inter";
  font-size: 17px;
  font-weight: 600;
  `;
  const FinanceSubHeading = styled(Typography)`
  color: grey;
  font-family: "Inter";
  font-size: 16px;
  `;
  const FinanceAmount = styled(Typography)`
  font-family: "Inter";
  font-size: 16px;
  font-weight: 600;
  `;
  const LocationName = styled(Typography)`
  font-family: "Inter";
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  padding-left: 10px;
  &:hover {
    text-decoration: underline;
    color: #0170dc;
  }
`;
const DownloadBox = styled(Box)`
  border: 1px solid #d3d3d3;
  display: flex;
  cursor: pointer;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  &:hover {
    background-color: #d3d3d3;
  }
  `;
  const IconBox = styled(Box)`
  width: 30px;
  height: 30px;
  padding: 3px;
  `;
  const TitleBox = styled(Box)`
  display: flex;
  padding: 15px;
  align-items: center;
  & > p {
    font-family: "Inter";
    font-size: 15px;
    padding-left: 10px;
  }
  `;
  const DownloadIcon = styled(Box)`
  padding: 15px;
  `;
  const MessageButton = styled(Box)`
  border: 1px solid black;
  display: flex;
  width: max-content;
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #121c30;
    color: white;
  }
  `;
  const Property = styled(Card)`
  background-color: white;
  border-radius: 10px;
  &:hover {
    transform: translateY(-10px);
  }
  `;
  const Subheader = styled(Box)`
  display: flex;
  & div {
    border: 1px solid lightgray;
    padding: 4px 10px;
    margin-right: 10px;
    border-radius: 6px;
  }
  `;
  const PriceBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: 15px 0 10px 0;
  align-items: center;
  `;
  const ReturnsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background-color: #f6f7f9;
  font-family: "Inter";
  color: grey;
  > div {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    font-size: 15px;
  }
  `;
  const Category = styled(Typography)`
  position: absolute;
  width: 100%;
  text-align: center;
  background-color: #0170dc;
  color: white;
  z-index: 2;
  padding: 5px;
  font-family: "Inter";
  `;
  const Header = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
  font-family: "Inter";
  margin: 10px 0;
  `;


  function SliderValueLabel({ children }) {
    return <span className="valueLabel">{children}</span>;
  }
  
  SliderValueLabel.propTypes = {
    children: PropTypes.element.isRequired,
  };
  
  function valuetext(value) {
    return `${value}°C`;
  }
  
  const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    300: '#66B2FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B3',
    900: '#003A75',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const Slider = styled(BaseSlider)(
    ({ theme }) => `
    color: ${theme.palette.mode === 'light' ? grey[500] : grey[400]};
    height: 6px;
    width: 100%;
    padding: 16px 0;
    display: inline-flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
  
    &.${sliderClasses.disabled} {
      pointer-events: none;
      cursor: default;
      color: ${theme.palette.mode === 'light' ? grey[300] : grey[600]};
      opacity: 0.4;
    }
  
    & .${sliderClasses.rail} {
      display: block;
      position: absolute;
      width: 100%;
      height: 4px;
      border-radius: 6px;
      background-color: currentColor;
      opacity: 0.3;
    }
  
    & .${sliderClasses.track} {
      display: block;
      position: absolute;
      height: 4px;
      border-radius: 6px;
      background-color: currentColor;
    }
  
    & .${sliderClasses.thumb} {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      margin-left: -6px;
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      border-radius: 50%;
      outline: 0;
      background-color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
      transition-property: box-shadow, transform;
      transition-timing-function: ease;
      transition-duration: 120ms;
      transform-origin: center;
  
      &:hover {
        box-shadow: 0 0 0 6px ${alpha(
          theme.palette.mode === 'light' ? blue[200] : blue[300],
          0.3,
        )};
      }
  
      &.${sliderClasses.focusVisible} {
        box-shadow: 0 0 0 8px ${alpha(
          theme.palette.mode === 'light' ? blue[200] : blue[400],
          0.5,
        )};
        outline: none;
      }
  
      &.${sliderClasses.active} {
        box-shadow: 0 0 0 8px ${alpha(
          theme.palette.mode === 'light' ? blue[200] : blue[400],
          0.5,
        )};
        outline: none;
        transform: scale(1.2);
      }
    }
  
    & .${sliderClasses.mark} {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 99%;
      background-color: ${theme.palette.mode === 'light' ? blue[200] : blue[900]};
      transform: translateX(-50%);
    }
  
    & .${sliderClasses.markActive} {
      background-color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
    }
  
    & .${sliderClasses.markLabel} {
      font-family: Inter;
      font-weight: 600;
      font-size: 12px;
      position: absolute;
      top: 24px;
      transform: translateX(-50%);
      margin-top: 8px;
    }
  `,
  );
  
  const contentStyle = { background: '#000' };
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' };


  const marks = [
    {
      value: 5000,
      label: '5000',
    },
    {
      value: 35000,
      label: '',
    },
    {
      value: 65000,
      label: '',
    },
    {
      value: 95000,
      label: '',
    },
    {
      value: 125000,
      label: '',
    },
    {
      value: 155000,
      label: '',
    },
    {
      value: 185000,
      label: '',
    },
    {
      value: 215000,
      label: '',
    },
    {
      value: 245000,
      label: '',
    },
    {
      value: 275000,
      label: '',
    },
    
    {
      value: 305000,
      label: '3L+',
    },
    
  ];

  const arrowStyle = { color: '#000' }; // style for an svg element
  
  const documents = ["hello", "bye", "noob", "player"];
  
  const PropertyItem = ({ handleCart, clicked, setClicked }) => {

    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
    
    const controlProps = (item) => ({
      checked: selectedValue === item,
      onChange: handleChange,
      value: item,
      name: 'size-radio-button-demo',
      inputProps: { 'aria-label': item },
    });

    const URL = config.URL;
    const [invtype,setinvtype]=useState(1);
    const location=useLocation();
    // console.log("hello");
    const [totalamount,settotalamount]=useState(0);
    const [count,setcount]=useState(0);
    
    const [quantity, setQuantity] = useState(2000);
    const [investment, setInvestment] = useState(50000);
    const [propertyValueGrowth, setPropertyValueGrowth] = useState(30);
    const [interestamount,setIntetestAmount]=useState(50000);
    const [rentalYield, setRentalYield] = useState(3);
    const [userinvest,setUserInvest]=useState(5000);
    const [userinvestone,setUserInvestOne]=useState(10000);
    const [showFullContent, setShowFullContent] = useState(false);
    
    const { id } = useParams(); // Access the ID from the URL params
    const [listing, setListing] = useState({});
    const token = JSON.parse(localStorage.getItem("userinfo"));
    const [content,setContent]=useState("");
    const[truncatedContent,settruncatedcontent]=useState("");
    const [shouldTruncate,setShouldtruncate]=useState(false);
    const maxWords = 50;
    console.log(location);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`${URL}/listing/${id}`);
        console.log(response.data);
        setListing(response.data);
        setContent(listing.propertyoverview);
        settruncatedcontent( content.split(" ").slice(0, maxWords).join(" "));
        setShouldtruncate(content.split(" ").length > maxWords);
        // listing.push(response.data);
        // console.log(listing.images.length);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [id]);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  // console.log('before contedn');
  // console.log(listing);
 
  const mapstylebig={
    border: 0,
    width: "100%",
    height:'450px',
    borderRadius: "20px",
    backgroundColor: "black",
  }
  const mapstylesmall={
    border: 0,
    width: "100%",
    height: `"300px"`,
    borderRadius: "20px",
    backgroundColor: "black",
  }
  const handleInvestmentChange = (event) => {
    setInvestment(Number(event.target.value));
  };
  const handleUserInvestChange = (event) => {
    setUserInvest(Number(event.target.value));
  };
  const handleUserInvestChangeOne = (event) => {
    setUserInvestOne(Number(event.target.value));
  };
  const handleInterestChange=(event)=>{
    setIntetestAmount(Number(event.target.value));
  }
  const handlePropertyValueGrowthChange = (event) => {
    setPropertyValueGrowth(Number(event.target.value));
  };
  const handleRentalYieldChange = (event) => {
    setRentalYield(Number(event.target.value));
  };
  const handleTwo = () => {
    setQuantity(quantity + 2000);
  };
  const cols=[5,2.5,2.5,5];
  const rows=[1,]
  const handleInterest=(e)=>{
    e.preventDefault();
    let interestusers = JSON.parse(localStorage.getItem("interestusers1") || "[]");
   interestusers.push({
    name:token.name,
    email:token.email,
    amount:interestamount,
    contactnumber:token.phone,
    property:id
   });
   localStorage.setItem("interestusers1", JSON.stringify(interestusers));
   console.log(localStorage.getItem("interestusers1"));
   toast.success("Response recorded sucessfully");
   setOpen(false);
   }

   const handleRequest=async (tp)=>{
    try {
      const data={
        type:{selectedValue}=="allotment"?0:1,
        name:token.name,
        email:token.email,
        phone:token.phone,
        property:listing.properyheading,
        image:listing.images[0],
        amount:userinvestone
      }
      const ans=await axios.post(`${URL}/investment/add`,data);
      if(ans){
        console.log(ans);
        if(tp==1){
          navigate('/cart');
        }
        toast.success("Response recorded sucessfully");
        setTimeout(() => {
          navigate('/dashboard/cart')
        }, 2000);
        setOpenInv(false);
      }
      else{
        toast.warning("failed response");
      }
    } catch (error) {
      console.log(error);
    }
   }

  const handleFive = () => {
    setQuantity(quantity + 5000);
  };
  const handleTen = () => {
    setQuantity(quantity + 10000);
  };
  const handleLocation = () => {
    const url = `https://goo.gl/maps/UvmtjH8XZJyCntSF6`; // Specify the latitude and longitude of the location
    window.open(url, "_blank");
  };
  const handleDownload = (fileName, originalFileName) => {
    const link = document.createElement("a");
    link.href = fileName;
    link.setAttribute("download", originalFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [isAdmin, setAdmin] = useState(false);
  
  useEffect(() => {
    setAdmin(token.isAdmin);
  }, []);

  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const rowarr=[5,4,4,2.5];
  const colarr=[5,3,2,5];
  const handleEditClick = () => {
    setIsEditMode(true);
    navigate(`/${listing._id}/edit`);
  };


  const isSmallScreen = useMediaQuery("(max-width:600px)");
  // const isLargeScreen = useMediaQuery("(max-width:1300px)");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [openinv, setOpenInv] = useState((location?.state?.clicked?true:false));
  const closeModalinv = () => setOpenInv(false);
  const [phone,setPhone]=useState("");
  const ps=`/dashboard/properties/view/photos/${id}`;

  return (
    <div style={{
      opacity:openinv?'0.25':'1.0',
      // backgroundColor:'black'
    }}>
      <Box style={{ padding: "20px" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box style={{ display: "flex" }}>
            <PropertyLink to="/dashboard/properties">
              <Typography
                style={{
                  fontFamily: "Inter",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                Properties
              </Typography>
            </PropertyLink>

            {arrow}
            <Typography
              style={{
                color: "#a3abba",
                marginLeft: "10px",
                fontFamily: "Inter",
                fontSize: "15px",
              }}
            >
              {listing.properyheading}
            </Typography>
          </Box>

          <Box>
            {!isSmallScreen && <Bookmark onClick={() => setClicked(!clicked)}>
              {clicked === true ? (
                <BookmarkIcon style={{ color: "#0170dc" }} />
              ) : (
                <BookmarkBorderIcon />
              )}
              <Typography
                style={{
                  paddingLeft: "10px",
                  fontFamily: "Inter",
                  fontSize: "18px",
                }}
              >
                Bookmark
              </Typography>
            </Bookmark>}
            
          </Box>
        </Box>

        <Box
          style={{
            display: "flex",
            alignItems:"center",
            justifyContent:"center",
            alignContent:"center",
            flexDirection: "column",
            position: "relative",
            marginTop:'20px'
          }}
        >
          {isSmallScreen ? (
            <Grid item xs={2} sm={4} md={4}>
              <Property sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia>
                    <Carousel showIndicators={false} showThumbs={false}>
                    {listing.images && listing.images.slice(0,4).map((item,index) => (
    <img src={item} alt="image" height={240} />
  ))}
                      
                      {/* <div>
                        <img src="/images/signup_page.jpg" alt="second" />
                      </div>
                      <div>
                        <img src="/images/signup_page.jpg" alt="third" />
                      </div> */}
                    </Carousel>
                  </CardMedia>
                </CardActionArea>
              </Property>
            </Grid>
          ) : (
            
            <ImageList
              sx={{ width:  '100%', height: 500 }}
              variant="quilted"
              cols={10}
            >
              {listing.images && listing.images.slice(0,4).map((item,index) => (
    <ImageListItem key={index} cols={colarr[index]} rows={rowarr[index]}>
   <img
        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        src={`${item}?w=164&h=164&fit=crop&auto=format`}
        alt={"my image"}
        loading="lazy"
      />
    </ImageListItem>
  ))}
            </ImageList>
          )}

          <Box
            style={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
              borderRadius: "50px",
              position: "absolute",
              bottom: -25,
              right: 20,
            }}
          >
            <PhotoLink to={ps}>
              <SmallBoxes style={{ margin: "0 15px" }}>
                <Box style={{ width: "40px", height: "40px", padding: "7px" }}>
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    class="chakra-icon css-pawapt"
                    aria-label="gallery"
                  >
                    <g
                      fill="none"
                      fill-rule="nonzero"
                      stroke="#0170dc"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M19.9969 21H4.00293C2.89793 21 2.00293 20.105 2.00293 19V5C2.00293 3.895 2.89793 3 4.00293 3H19.9969C21.1019 3 21.9969 3.895 21.9969 5V19C21.9969 20.105 21.1009 21 19.9969 21Z M9.41422 7.58579C10.1953 8.36684 10.1953 9.63317 9.41422 10.4142C8.63317 11.1953 7.36684 11.1953 6.58579 10.4142C5.80474 9.63317 5.80474 8.36684 6.58579 7.58579C7.36684 6.80474 8.63317 6.80474 9.41422 7.58579 M22 15.9999L17.781 12.6249C17.35 12.2799 16.72 12.3499 16.375 12.7809L13.039 16.9509C12.694 17.3819 12.065 17.4519 11.633 17.1069L9.765 15.6119C9.34 15.2719 8.721 15.3339 8.372 15.7529L4 20.9999"></path>
                    </g>
                  </svg>
                </Box>

                <Extra>{(listing.images!=undefined)?listing.images.length:8} photos</Extra>
              </SmallBoxes>
            </PhotoLink>

            <Divider
              orientation="vertical"
              style={{ backgroundColor: "rgb(112,111,111)" }}
              flexItem
              variant="middle"
            />

            <SmallBoxes style={{ margin: "0 15px 0 5px" }}>
              <Box style={{ width: "40px", height: "40px", padding: "7px" }}>
                <svg
                  viewBox="0 0 24 24"
                  focusable="false"
                  class="chakra-icon css-pawapt"
                  aria-label="virtual-tour"
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="#0170dc"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 16.0412V7.95921C21 7.24421 20.619 6.58421 20 6.22721L13 2.18621C12.381 1.82921 11.619 1.82921 11 2.18621L4 6.22621C3.381 6.58421 3 7.24421 3 7.95921V16.0422C3 16.7572 3.381 17.4172 4 17.7742L11 21.8152C11.619 22.1722 12.381 22.1722 13 21.8152L20 17.7742C20.619 17.4162 21 16.7562 21 16.0412Z M12 22.08V12 M12 12L20.73 6.95996 M3.26953 6.95996L11.9995 12"></path>
                  </g>
                </svg>
              </Box>

              <Extra onClick={()=>{
                window.location.href=listing.tourlink
              }}>Virtual tour</Extra>
            </SmallBoxes>
          </Box>
        </Box>

        {isSmallScreen && (
          <Grid item xs={12} style={{ position: "relative",marginTop:'20px' }}>
            <Pricing>
              <Box
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  marginTop:'10px',
                  padding: "8px",
                }}
              >
                <Box style={{ textAlign: "center", paddingBottom: "10px" }}>
                  <Typography
                    style={{
                      fontSize: "18px",
                      color: "rgb(112,111,111)",
                      fontFamily: "Inter",
                    }}
                  >
                    Property price
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "24px",
                      color: "#0170dc",
                      fontFamily: "Inter",
                    }}
                  >
                    RUP{" "}
                    <b style={{ fontSize: "32px" }}>{listing.propertyprice}</b>
                  </Typography>
                </Box>
                {/* <progress
                  value={1634600}
                  max={2059765}
                  style={{ width: "100%" }}
                /> */}
                {/* <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "20px",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "14px",
                      color: "rgb(112,111,111)",
                      fontFamily: "Inter",
                    }}
                  >
                    {" "}
                    funded
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "14px",
                      color: "rgb(112,111,111)",
                      fontFamily: "Inter",
                    }}
                  >
                    RUP 4,25,165 available
                  </Typography>
                </Box> */}

                {/* <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "10px",
                  }}
                > */}
                  {/* <Typography
                    style={{ color: "rgb(112,111,111)", fontFamily: "Inter" }}
                  >
                    <b style={{ paddingRight: "5px", color: "#0170dc" }}>493</b>
                    investors
                  </Typography> */}
                  {/* <Typography
                    style={{
                      alignItems: "center",
                      display: "flex",
                      color: "red",
                      fontFamily: "Inter",
                    }}
                  >
                    <AccessTimeIcon style={{ paddingRight: "5px" }} /> 56 days
                    left
                  </Typography> */}
                {/* </Box> */}

                <Box
                  style={{
                    backgroundColor: "#f6f7f9",
                    padding: "10px",
                    borderRadius: "20px",
                  }}
                >
                  
                   <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "10px 0",
                          paddingTop: "5px",
                          paddingBottom:"5px"
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Funding Date
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.fundingdate}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "10px 0",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px",padding:'3px', fontFamily: "Inter" }}
                        >
                          Min. Investment
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.mininvestment}
                        </Typography>
                      </Box>

                      {/* <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Projected gross yield
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.grossyield}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                          paddingBottom: "10px",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Projected net yield
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.netyield}
                        </Typography>
                      </Box> */}
                       {/* <div style={{
        marginTop:'0px',
        display:'flex',
        justifyContent:'center'
      }}>
      <button  onClick={()=>{
                       window.location.href='https://calendly.com/venqtech/15min';
                       }} style={{
                        alignContent:'center',
                        alignItems:'center',
                        backgroundColor:'#00b386',
                        borderRadius:'5px'
                      }}>
                        Schedule an E-meet </button> 
      </div> */}
                    </Box>
                  {/* <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "20px 0",
                      paddingTop: "10px",
                    }}
                  >
                    <Typography
                      style={{ fontSize: "14px", fontFamily: "Inter" }}
                    >
                      Annualised return
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontFamily: "Inter",
                        fontSize: "14px",
                      }}
                    >
                      {listing.annualizedreturn}
                    </Typography>
                  </Box>

                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "20px 0",
                    }}
                  >
                    <Typography
                      style={{ fontSize: "14px", fontFamily: "Inter" }}
                    >
                      Annual appreciation
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontFamily: "Inter",
                        fontSize: "14px",
                      }}
                    >
                      {listing.annualappreciation}
                    </Typography>
                  </Box> */}
{/* 
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "20px 0",
                    }}
                  >
                    <Typography
                      style={{ fontSize: "14px", fontFamily: "Inter" }}
                    >
                      Projected gross yield
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontFamily: "Inter",
                        fontSize: "14px",
                      }}
                    >
                      {listing.grossyield}
                    </Typography>
                  </Box> */}

                  {/* <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "20px 0",
                      paddingBottom: "10px",
                    }}
                  >
                    <Typography
                      style={{ fontSize: "14px", fontFamily: "Inter" }}
                    >
                      Projected net yield
                    </Typography>
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontFamily: "Inter",
                        fontSize: "14px",
                      }}
                    >
                      {listing.netyield}
                    </Typography>
                  </Box> */}
                  
              </Box>
            </Pricing>
          </Grid>
        )}

        <Box style={{ padding: "10px 0", margin: "10px 0" }}>
          <Grid container spacing={2}>
            {
              <Grid item xs={12} sm={8}>
                <Details>
                  <Box>
                    <Typography
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 800,
                        width:'100%',
                        paddingBottom: "10px",
                      }}
                      variant="h4"
                    >
                      {listing.properyheading}
                    </Typography>

                    <Box style={{ display: "flex", paddingBottom: "30px" }}>    
                      <SubTitle>{listing.propertydescription}</SubTitle>

                      {/* <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                        style={{ backgroundColor: "darkgrey" }}
                      />
                      <SubTitle>{listing.specs?.[1]}</SubTitle>

                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                        style={{ backgroundColor: "darkgrey" }}
                      />
                      <SubTitle>{listing.specs?.[2]}</SubTitle>

                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                        style={{ backgroundColor: "darkgrey" }}
                      />
                      <SubTitle>{listing.specs?.[3]}</SubTitle> */}
                    </Box>
                  </Box>

                  <Divider />

                  <Box style={{ padding: "20px 0" }}>
                    {listing &&
                      listing.specs &&
                      listing.specs.map((listing_content) => (
                        <PropertyDetails>
                          <Logo>
                            <img
                              src={listing_content.specsimage}
                              alt=""
                              style={{
                                height: "35px",
                                borderRadius: "50%",
                              }}
                            />
                          </Logo>

                          <Box>
                            <PropertyHeadingSmall>
                              {listing_content.specstitle}
                            </PropertyHeadingSmall>
                            <PropertySubHeading>
                              {listing_content.specssubtitle}
                            </PropertySubHeading>
                          </Box>
                        </PropertyDetails>
                      ))}
                  </Box>

                  <Divider />

                  <Box style={{ padding: "20px 0 " }}>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        fontFamily: "Inter",
                      }}
                    >
                      Investment calculator
                    </Typography>

                    <Box style={{ textAlign: "center", padding: "20px 0" }}>
                      <Typography
                        style={{
                          color: "grey",
                          fontSize: "28px",
                          fontFamily: "Inter",
                        }}
                      >
                        Projected investment return of
                      </Typography>

                      <ThemeProvider theme={theme}>
                        <Typography
                          style={{
                            fontSize: "24px",
                            fontFamily: "Inter",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "grey",
                          }}
                        >
                          <b
                            style={{
                              fontSize: "24px",
                              padding: "5px",
                              color: "black",
                            }}
                          >
                            RUP {investment+((investment*propertyValueGrowth))/100 + (rentalYield*(3*investment))/100}
                          </b>{" "}
                          in{" "}
                          <b
                            style={{
                              fontSize: "24px",
                              padding: "5px",
                              color: "black",
                            }}
                          >
                            3 years
                          </b>
                          <Tooltip title={info} placement="bottom">
                            <Typography
                              style={{
                                border: "1px solid rgb(112,111,111)",
                                color: "rgb(112,111,111)",
                                display: "inline",
                                cursor: "pointer",
                                padding: "0px 6px",
                                marginLeft: "5px",
                                borderRadius: "50%",
                                fontSize: "10px",
                              }}
                            >
                              i
                            </Typography>
                          </Tooltip>
                        </Typography>
                      </ThemeProvider>

                      <Box
                        style={{
                          display: "flex",
                          flexDirection: isSmallScreen ? "column" : "row",
                          border: "1px solid grey",
                          borderRadius: "20px",
                          padding: "20px",
                          margin: "20px 0",
                          justifyContent: "space-around",
                        }}
                      >
                        <GraphInfo>
                     
                          <Box
                            style={{
                              backgroundColor: "rgb(18, 28, 48)",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              margin: "7px 5px",
                            }}
                          ></Box>
                          <Box style={{ textAlign: "left", padding: "0 10px" }}>
                            <GraphHeading>Investment</GraphHeading>
                            <GraphSubHeading>RUP {investment}</GraphSubHeading>
                          </Box>
                        </GraphInfo>

                        <GraphInfo>
                          <Box
                            style={{
                              backgroundColor: "rgba(94, 71, 242, 1)",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              margin: "7px 5px",
                            }}
                          ></Box>
                          <Box style={{ textAlign: "left", padding: "0 10px" }}>
                            <GraphHeading>Total rental income</GraphHeading>
                            <GraphSubHeading>
                              RUP {(rentalYield*(3*investment))/100}
                            </GraphSubHeading>
                          </Box>
                        </GraphInfo>

                        <GraphInfo>
                          <Box
                            style={{
                              backgroundColor: "rgb(65, 206, 142)",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              margin: "7px 5px",
                            }}
                          ></Box>
                          <Box style={{ textAlign: "left", padding: "0 10px" }}>
                            <GraphHeading>Value appreciation</GraphHeading>
                            <GraphSubHeading>RUP {((investment*propertyValueGrowth))/100}</GraphSubHeading>
                          </Box>
                        </GraphInfo>
                      </Box>
                    </Box>

                    <Box>
                      <VerticalBarGraph
                        investment={investment}
                        propertyValueGrowth={propertyValueGrowth}
                        rentalYield={rentalYield}
                        handleInvestmentChange={handleInvestmentChange}
                        handlePropertyValueGrowthChange={
                          handlePropertyValueGrowthChange
                        }
                        handleRentalYieldChange={handleRentalYieldChange}
                      />

                      <Box
                        style={{
                          backgroundColor: "#f6f7f9",
                          padding: "10px",
                          borderRadius: "10px",
                          margin: "0 30px 40px 30px",
                        }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Inter",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            Default values are based on property numbers
                            <Tooltip title={info1} placement="top">
                              <Typography
                                style={{
                                  border: "1px solid rgb(112,111,111)",
                                  color: "rgb(112,111,111)",
                                  display: "inline",
                                  cursor: "pointer",
                                  padding: "0px 6px",
                                  marginLeft: "5px",
                                  borderRadius: "50%",
                                  fontSize: "10px",
                                }}
                              >
                                i
                              </Typography>
                            </Tooltip>
                          </Typography>
                        </ThemeProvider>
                      </Box>
                    </Box>
                  </Box>

                  <Box style={{ paddingBottom: "20px" }}>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        fontFamily: "Inter",
                        paddingBottom: "20px",
                      }}
                    >
                      Property Overview
                    </Typography>

                   
                    <Typography
                      style={{ fontFamily: "Inter", fontSize: "16px" }}
                    >
                      {listing && listing.propertyoverview && listing.propertyoverview.length>maxWords && <div>
                        {listing.propertyoverview.split(" ").slice(0, maxWords).join(" ")}
                        < div hidden={!showFullContent}>
                          {listing.propertyoverview.split(" ").slice(51, listing.propertyoverview.length).join(" ")}
                        </div>
                        
                      </div>}
                        <MoreButton onClick={()=>{
                          setShowFullContent(!showFullContent)
                        }}>
                        {showFullContent ? "Show less" : "Show more"}
                      </MoreButton>
                      {/* {showFullContent
                        ? content
                        : shouldTruncate
                        ? truncatedContent + "..."
                        : content} */}
                    </Typography>

                    {/* {shouldTruncate && (
                      <MoreButton onClick={toggleContent}>
                        {showFullContent ? "Show less" : "Show more"}
                      </MoreButton>
                    )} */}

                   
                  </Box>

                  {isSmallScreen ? (
                    <Box style={{ paddingBottom: "20px" }}>
                      <Typography
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          fontFamily: "Inter",
                          padding: "20px 0",
                        }}
                      >
                        Financials
                      </Typography>

                      <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>
                          <Box style={{ padding: "10px 0" }}>
                            <FinanceHeading>Property cost</FinanceHeading>

                            <Box>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Property price
                                </FinanceSubHeading>
                                <FinanceAmount>
                                  RUP {listing.propertyprice}
                                </FinanceAmount>
                              </Box>

                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Transaction costs
                                </FinanceSubHeading>
                                <FinanceAmount>
                                  RUP {listing.transactioncost}
                                </FinanceAmount>
                              </Box>

                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>Govt. Fees</FinanceSubHeading>
                                <FinanceAmount>
                                  {listing.venqfee}
                                </FinanceAmount>
                              </Box>
                            </Box>

                            <Divider />

                            <Box>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Investment cost
                                </FinanceSubHeading>
                                <FinanceAmount style={{ color: "#0170dc" }}>
                                  RUP {listing.propertyprice}
                                </FinanceAmount>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box style={{ padding: "10px 0" }}>
                            <FinanceHeading>
                              Rental income (Year 1)
                            </FinanceHeading>

                            <Box>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Projected gross rent
                                </FinanceSubHeading>
                                <FinanceAmount>
                                  RUP {listing.projectedgrossrent}
                                </FinanceAmount>
                              </Box>

                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Service charges
                                </FinanceSubHeading>
                                <FinanceAmount>
                                  (RUP {listing.servicecharges})
                                </FinanceAmount>
                              </Box>

                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Mgmt. and maintenance
                                </FinanceSubHeading>
                                <FinanceAmount>
                                  (RUP {listing.maintainencefee})
                                </FinanceAmount>
                              </Box>
                            </Box>

                            <Divider />

                            <Box>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Annual net income
                                </FinanceSubHeading>
                                <FinanceAmount style={{ color: "#0170dc" }}>
                                  RUP {listing.annualnetincome}
                                </FinanceAmount>
                              </Box>
                            </Box>

                            <Box
                              style={{
                                backgroundColor: "#f6f7f9",
                                padding: "10px",
                                borderRadius: "10px",
                              }}
                            >
                              <ThemeProvider theme={theme}>
                                <Typography
                                  style={{
                                    fontSize: "13px",
                                    fontFamily: "Inter",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  This is an estimate for the 1st year of
                                  ownership
                                  <Tooltip title={info1} placement="top">
                                    <Typography
                                      style={{
                                        border: "1px solid rgb(112,111,111)",
                                        color: "rgb(112,111,111)",
                                        display: "inline",
                                        cursor: "pointer",
                                        padding: "0px 6px",
                                        marginLeft: "5px",
                                        borderRadius: "50%",
                                        fontSize: "10px",
                                      }}
                                    >
                                      i
                                    </Typography>
                                  </Tooltip>
                                </Typography>
                              </ThemeProvider>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  ) : (
                    <Box style={{ paddingBottom: "20px" }}>
                      <Typography
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          fontFamily: "Inter",
                          padding: "20px 0",
                        }}
                      >
                        Financials
                      </Typography>

                      <Grid container spacing={5}>
                        <Grid item xs={6}>
                          <Box style={{ padding: "10px 0" }}>
                            <FinanceHeading>Property cost</FinanceHeading>

                            <Box>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Property price
                                </FinanceSubHeading>
                                <FinanceAmount>
                                  RUP {listing.propertypricen}
                                </FinanceAmount>
                              </Box>

                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Transaction costs
                                </FinanceSubHeading>
                                <FinanceAmount>
                                  RUP {listing.transactioncost}
                                </FinanceAmount>
                              </Box>

                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>Govt. Fees</FinanceSubHeading>
                                <FinanceAmount>
                                  {listing.venqfee}
                                </FinanceAmount>
                              </Box>
                            </Box>

                            <Divider />

                            <Box>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Investment cost
                                </FinanceSubHeading>
                                <FinanceAmount style={{ color: "#0170dc" }}>
                                  RUP {listing.propertyprice}
                                </FinanceAmount>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={6}>
                          <Box style={{ padding: "10px 0" }}>
                            <FinanceHeading>
                              Rental income (Year 1)
                            </FinanceHeading>

                            <Box>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Projected gross rent
                                </FinanceSubHeading>
                                <FinanceAmount>
                                  RUP {listing.projectedgrossrent}
                                </FinanceAmount>
                              </Box>

                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Service charges
                                </FinanceSubHeading>
                                <FinanceAmount>
                                  (RUP {listing.servicecharges})
                                </FinanceAmount>
                              </Box>

                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Mgmt. and maintenance
                                </FinanceSubHeading>
                                <FinanceAmount>
                                  (RUP {listing.maintainencefee})
                                </FinanceAmount>
                              </Box>
                            </Box>

                            <Divider />

                            <Box>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px 0",
                                }}
                              >
                                <FinanceSubHeading>
                                  Annual net income
                                </FinanceSubHeading>
                                <FinanceAmount style={{ color: "#0170dc" }}>
                                  RUP {listing.annualnetincome}
                                </FinanceAmount>
                              </Box>
                            </Box>

                            <Box
                              style={{
                                backgroundColor: "#f6f7f9",
                                padding: "10px",
                                borderRadius: "10px",
                              }}
                            >
                              <ThemeProvider theme={theme}>
                                <Typography
                                  style={{
                                    fontSize: "13px",
                                    fontFamily: "Inter",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  This is an estimate for the 1st year of
                                  ownership
                                  <Tooltip title={info1} placement="top">
                                    <Typography
                                      style={{
                                        border: "1px solid rgb(112,111,111)",
                                        color: "rgb(112,111,111)",
                                        display: "inline",
                                        cursor: "pointer",
                                        padding: "0px 6px",
                                        marginLeft: "5px",
                                        borderRadius: "50%",
                                        fontSize: "10px",
                                      }}
                                    >
                                      i
                                    </Typography>
                                  </Tooltip>
                                </Typography>
                              </ThemeProvider>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  {listing.fundtimeline && 
                    <Box style={{ paddingBottom: "20px" }}>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        fontFamily: "Inter",
                        padding: "20px 0",
                      }}
                    >
                      Funding timeline
                    </Typography>

                    <Box
                      style={{
                        backgroundColor: "#f6f7f9",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        width: "fit-content",
                      }}
                    >
                      <Typography
                        style={{ fontSize: "12px", fontFamily: "Inter" }}
                      >
                        Each step may occur earlier than the dates below
                      </Typography>
                    </Box>
                    {
                      listing.fundtimeline && <Period fundt ={listing.fundtimeline}/>
                    }
                    
                  </Box>
                  }
                  

                  <Box style={{ paddingBottom: "20px" }}>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        fontFamily: "Inter",
                        padding: "20px 0",
                      }}
                    >
                      Location
                    </Typography>

                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        padding: "0 0 10px 0",
                      }}
                    >
                      <PlaceOutlinedIcon style={{ color: "#0170dc" }} />
                      <LocationName
                        style={{
                          fontFamily: "Inter",
                          fontSize: "18px",
                          fontWeight: 600,
                        }}
                        onClick={handleLocation}
                      >
                        The location is displayed below in the map
                      </LocationName>
                    </Box>

                    <Box>
                      {isSmallScreen && <iframe
                        src={listing.locationlink}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        style={mapstylesmall}
                      ></iframe>}
                      {!isSmallScreen &&  <iframe
                        src={listing.locationlink}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        style={mapstylebig}
                      ></iframe>}
                     
                    </Box>

                    <Typography
                      style={{
                        fontFamily: "Inter",
                        fontSize: "16px",
                        padding: "20px 0",
                      }}
                    >
                     {listing.locationdescription}
                    </Typography>
                  </Box>

                  <Box style={{ paddingBottom: "40px" }}>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        fontFamily: "Inter",
                        padding: "20px 0",
                      }}
                    >
                      Amenities
                    </Typography>

                    <Box
                      style={{
                        display: "flex",
                        flexDirection: isSmallScreen ? "column" : "row",
                      }}
                    >
                      {listing &&
                        listing.amenities &&
                        listing.amenities.map((amenity) => (
                          <Box
                            style={{
                             width:'100%'
                            }}
                          >
                            {/* <Box>
                              <FitnessCenterIcon
                                style={{ width: "50px", height: "35px",marginLeft:'30px' }}
                              />
                            </Box> */}
                            <Typography
                              style={{
                                textAlign:'center',
                                fontFamily: "Inter",
                                fontSize: "18px",
                                paddingLeft: "5px",
                              }}
                            >
                              {amenity.aname}
                            </Typography>
                          </Box>
                        ))}
                    </Box>
                  </Box>

                  <Box style={{ paddingBottom: "40px" }}>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        fontFamily: "Inter",
                        padding: "10px 0",
                      }}
                    >
                      Documents ({listing.documents?.length})
                    </Typography>
                    {listing &&
                      listing.documents &&
                      listing.documents.map((document) => (
                        <Box>
                          <DownloadBox
                            onClick={() =>
                              handleDownload(document.dlink, document.dname)
                            }
                          >
                            <TitleBox>
                              <IconBox>
                                <svg
                                  viewBox="0 0 24 24"
                                  focusable="false"
                                  class="chakra-icon css-768dc"
                                  aria-label="file-excel"
                                >
                                  <g
                                    fill="none"
                                    fill-rule="nonzero"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    <g>
                                      <path d="M18.414 6.414L15.586 3.586C15.211 3.211 14.702 3 14.172 3H7C5.895 3 5 3.895 5 5V19C5 20.105 5.895 21 7 21H17C18.105 21 19 20.105 19 19V7.828C19 7.298 18.789 6.789 18.414 6.414V6.414Z"></path>
                                      <path d="M9 12H15C15.552 12 16 12.448 16 13V17C16 17.552 15.552 18 15 18H9C8.448 18 8 17.552 8 17V13C8 12.448 8.448 12 9 12Z"></path>
                                      <path d="M16 15H8 M13 12V18 M19 8H15C14.448 8 14 7.552 14 7V3"></path>
                                    </g>
                                  </g>
                                </svg>
                              </IconBox>

                              <Typography>{document.dname}</Typography>
                            </TitleBox>

                            <DownloadIcon>
                              <FileDownloadOutlinedIcon
                                style={{ color: "#0170dc" }}
                              />
                            </DownloadIcon>
                          </DownloadBox>
                        </Box>
                      ))}
                  </Box>

                  <Box style={{ paddingBottom: "30px" }}>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        fontFamily: "Inter",
                        padding: "20px 0",
                      }}
                    >
                      Have more questions about this property?
                    </Typography>

                    <Box style={{ display: "flex", height: "15vh" }}>
                      

                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                        }}
                      >
                        <Typography
                          style={{ fontFamily: "Inter", fontSize: "17px" }}
                        >
                          Contact our real estate experts
                        </Typography>

                        <MessageButton>
                          <Box style={{ width: "25px", height: "25px" }}>
                            <svg
                              viewBox="0 0 24 24"
                              focusable="false"
                              class="chakra-icon css-pawapt"
                              aria-label="chat-bubble"
                              aria-hidden="true"
                            >
                              <g
                                fill="none"
                                fill-rule="nonzero"
                                stroke="#0170dc"
                                stroke-width="2.4000000000000004"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path d="M10.25 19.206L6.599 21.013V17.716C4.42 16.227 3 13.865 3 11.182C3 6.643 7.048 3 12 3C16.952 3 21 6.643 21 11.182C21 15.721 16.952 19.364 12 19.364C11.401 19.364 10.817 19.308 10.25 19.206Z"></path>
                              </g>
                            </svg>
                          </Box>

                          <Typography
                            style={{
                              fontFamily: "Inter",
                              fontSize: "17px",
                              paddingLeft: "10px",
                            }}
                          >
                            Message us
                          </Typography>
                        </MessageButton>
                      </Box>
                    </Box>
                  </Box>
                </Details>
              </Grid>
            }

            {!isSmallScreen && listing?.islive==1 && (
              <Grid item xs={4} style={{ position: "relative" }}>
                <Pricing>
                  <Box
                    style={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      padding: "10px",
                    }}
                  >
                    <Box style={{ textAlign: "center", paddingBottom: "10px" }}>
                      <Typography
                        style={{
                          fontSize: "18px",
                          color: "rgb(112,111,111)",
                          fontFamily: "Inter",
                        }}
                      >
                        Property price
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "24px",
                          color: "#0170dc",
                          fontFamily: "Inter",
                        }}
                      >
                        RUP{" "}
                        <b style={{ fontSize: "32px" }}>
                          {listing.propertyprice}
                        </b>
                      </Typography>
                    </Box>

                    {/* <progress
                      value={1634600}
                      max={2059765}
                      style={{ width: "100%" }}
                    /> */}
                    {/* <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "20px",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "rgb(112,111,111)",
                          fontFamily: "Inter",
                        }}
                      >
                        {" "}
                        funded
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "rgb(112,111,111)",
                          fontFamily: "Inter",
                        }}
                      >
                        RUP 4,25,165 available
                      </Typography>
                    </Box> */}

                    {/* <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "10px",
                      }}
                    > */}
                      {/* <Typography
                        style={{
                          color: "rgb(112,111,111)",
                          fontFamily: "Inter",
                        }}
                      >
                        <b style={{ paddingRight: "5px", color: "#0170dc" }}>
                          493
                        </b>
                        investors
                      </Typography> */}
                      {/* <Typography
                        style={{
                          alignItems: "center",
                          display: "flex",
                          color: "red",
                          fontFamily: "Inter",
                        }}
                      >
                        <AccessTimeIcon style={{ paddingRight: "5px" }} /> 56
                        days left
                      </Typography> */}
                    {/* </Box> */}
                    <div>
                      <ProgressBar
                        completed={100}
                        customLabel=""
                        className="wrapper"
                        bgColor="#50B487"
                        labelColor='#50B487'
                        height="0.6rem"
                        // labelClassName="label"
                      />
                      <Typography
                          style={{ fontSize: "14px",color:"black" , fontFamily: "Inter",
                        marginLeft:'5px' }}
                        >
                          100% funded
                        </Typography>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'1.5rem 0'}}>
                        <div>
                          <span style={{color:'#50B487',fontWeight:'800'}}>380 </span>
                          <span>investors</span>
                        </div>
                      <div style={{display:'flex',alignItems:'center'}}>
                      <img
                        src="/images/clock.png"
                        style={{marginRight:'1rem'}}
                      ></img>
                      <span style={{color:'red'}}> Closed on Mar 31,2024</span>
                      </div>
                    </div>

                    <Box
                      style={{
                        backgroundColor: "#f6f7f9",
                        padding: "1px",
                        borderRadius:'15px'
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "1rem 2rem",
                        }}
                      >
                        {/* <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter",
                        marginLeft:'5px' }}
                        >
                          Funding Date
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                            marginRight:'5px'
                          }}
                        >
                          {listing.fundingdate}
                        </Typography> */}
                        <span>
                          Yearly investment return
                        </span>
                        <span style={{fontWeight:800}}>
                          9.8%
                        </span>
                      </Box>
                      
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "1rem 2rem",
                        }}
                      >
                        {/* <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter",
                        marginLeft:'5px' }}
                        >
                          Funding Date
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                            marginRight:'5px'
                          }}
                        >
                          {listing.fundingdate}
                        </Typography> */}
                        <span>
                          Funded date
                        </span>
                        <span style={{fontWeight:800}}>
                          Mar 31, 2024
                        </span>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "1rem 2rem",
                        }}
                      >
                        {/* <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter",
                        marginLeft:'5px' }}
                        >
                          Funding Date
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                            marginRight:'5px'
                          }}
                        >
                          {listing.fundingdate}
                        </Typography> */}
                        <span>
                          Current valuation
                        </span>
                        <span style={{fontWeight:800}}  >
                          RUP 1,100,000
                        </span>
                      </Box>
                      
                      

                      {/* <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Projected gross yield
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.grossyield}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                          paddingBottom: "10px",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Projected net yield
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.netyield}
                        </Typography>
                      </Box> */}
                    </Box>
                    {/* <Box
                      style={{
                        backgroundColor: "#f6f7f9",
                        padding: "0px 20px",
                        borderRadius: "20px",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                          paddingTop: "10px",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Annualised return
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.annualizedreturn}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Annual appreciation
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.annualappreciation}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Projected gross yield
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.grossyield}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                          paddingBottom: "10px",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Projected net yield
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.netyield}
                        </Typography>
                      </Box>
                    </Box> */}
                    

                    <Box
                      style={{
                        display:'flex',
                        alignItems: "center",
                        justifyContent:'space-around',
                        marginTop:'20px',
                        // backgroundColor:'red',
                        padding:'1px',
                        
                      }}
                    >
                      <button  onClick={() => {
                          window.location.href='https://calendly.com/venqtech/15min';
                      }} style={{
                        alignContent:'center',
                        alignItems:'center',
                        color:'#50B487',
                        backgroundColor:'#EBF9F5',
                        borderRadius:'5px'
                      }}>Schedule an E-meet</button>
                      {listing.islive==2 && 
                      
                      <button  onClick={() => setOpen(o => !o)} style={{
                        alignContent:'center',
                        alignItems:'center',
                        backgroundColor:'#00b386',
                        borderRadius:'5px',
                        padding:'10px'
                      }}>I'm Interested</button>
                      }
                      
                      {listing.islive==1 && 
                        <button  onClick={() => setOpenInv(o => !o)} style={{
                          alignContent:'center',
                          alignItems:'center',
                          backgroundColor:'#00b386',
                          borderRadius:'5px',
                          paddingTop:'8px',
                          paddingBottom:'8px',
                          paddingLeft:'11%',
                          paddingRight:'11%'
                        }}>
                          Invest </button>
                      }
                       
                       
                      <StyledPopup open={open} closeOnDocumentClick onClose={closeModal} >
        <div className="modal">
          <a className="close" onClick={closeModal} style={{
            cursor:'pointer'
          }}>
            &times;
          </a>

          <form  onSubmit={handleInterest}>
          <Box>
          <Label>
            <LabelName>Select Amount to invest:</LabelName>
            
          </Label>

          <Label>
          <LabelAmount>RUP {interestamount}</LabelAmount>
          </Label>

          <LabelSlider
            type="range"
            min="50000"
            max="300000"
            step="500"
            value={interestamount}
            onChange={handleInterestChange}
          />
        </Box>
        <Button
              type="submit"
              variant="contained"
              style={{ margin: "8px 0" }}
              color="primary"
              fullWidth
              onClick={handleInterest}
            >
              Show Interest
            </Button>
          </form>
        </div>
      </StyledPopup>
          {/* bada version  */}

      <StyledPopupinv open={openinv} closeOnDocumentClick onClose={closeModalinv} >
        <div className="modal" style={{
          height:'100%',
          // backgroundColor:'red',
          margin:'0px',
          marginTop:'-10px',
          paddingLeft:'18px',
          paddingRight:'18px'
        }}>
          <a className="close" onClick={closeModalinv} style={{
            cursor:'pointer'
          }}>
            &times;
          </a>

          <form style={{
            height:'450px'
          }} onSubmit={handleInterest}>
          <Box>
      <div style={{
        display:'flex',
        justifyContent:'space-evenly'
      }}>
        {/* <div style={{
          display:'flex',
          justifyContent:'space-evenly'
        }}> */}
           <nav style={{
            width:'100%'
           }}>
            <ul style={{
              display:'flex',
              listStyle:'none',
              paddingInlineStart:'0px',
              borderBottom:'1px solid #e9e9eb',
              gap:'20px'
            }}>
              <li style={{
                fontWeight:'bold',
                borderBottom:invtype==0?'2px solid #00b386':'none',
                marginRight:'12px',
                color:invtype==0?'#00b386':'gray',
                cursor:'pointer',
                fontSize:'16px',
                fontFamily:'Inter'

              }} onClick={()=>{
                {!listing.properyheading.includes("Dholera") &&
                setinvtype(0);
              }
              }} >Allotment</li>
              <li style={{
                fontWeight:'bold',
                borderBottom:invtype==1?'2px solid #00b386':'none',
                color:invtype==1?'#00b386':'gray',
                marginRight:'12px',
                cursor:'pointer',
                fontSize:'16px',
                fontFamily:'Inter'

              }} onClick={()=>{
                setinvtype(1);
              }} >Invest</li>

            </ul>
          </nav>
        {/* <Label>
          <LabelName>Allotment:</LabelName>
        </Label>
      <Radio {...controlProps('allotment')} /> */}
        </div>
        {/* <div style={{
          display:'flex',
          justifyContent:'space-evenly'
        }}>
        <Label>
          <LabelName>Invest:</LabelName>
        </Label>
      <Radio {...controlProps('investment')} />
        </div>
      </div> */}
      <div style={{
        display:'flex',
        justifyContent:'space-between'
      }}>
          <Label>
          
            <LabelName sx={{
              fontSize:'14px',
              marginTop:'14px'
            }}>Investment Amount:</LabelName>
            
          </Label>
          {invtype==0 && 
          <input type="text" value={userinvest}
          onChange={(event)=>{
           setUserInvest(event.target.value);
          }}  style={{
            width:'40%',
            fontSize:'14px',
            backgroundColor:'#EBF9F5',
            color:'#50B487'
          }} />
          //   <TextField
          //   required
          //   name="userinvestmentamount"
          //   value={userinvest}
          //   onChange={(event)=>{
          //    setUserInvest(event.target.value);
          //   }}
          //  //  label="Enter your email"
          //  sx={{
          //    width:'40%',
          //    fontSize:'14px',
          //    backgroundColor:'#EBF9F5',
          //    color:'#50B487'
          //  }}
          //   type="text"
          // />
          }
          {invtype==1 && 
             <input type="text" value={userinvestone}
             onChange={(event)=>{
              setUserInvest(event.target.value);
             }}  style={{
               width:'40%',
               fontSize:'14px',
               backgroundColor:'#EBF9F5',
               color:'#50B487'
             }} />
          }
          
      </div>
          {invtype==0 && 
          <>
          <Box sx={{ width:'90%',alignItems:'center',justifyContent:'center',marginLeft:'16px' }}>
      <Slider
        aria-label="Temperature"
        defaultValue={5000}
        getAriaValueText={valuetext}
        min={5000}
        max={305000}
        step={30000}
        marks={marks}
        onChange={handleUserInvestChange}
      />
    </Box>
            
          </>
          }
          {invtype==1 && <>
           
            <Box sx={{ width:'90%',alignItems:'center',justifyContent:'center',marginLeft:'16px' }}>
      <Slider
        aria-label="Temperature"
        defaultValue={5000}
        getAriaValueText={valuetext}
        min={5000}
        max={310000}
        step={50000}
        marks={marks}
        onChange={handleUserInvestChangeOne}
      />
    </Box>
          </>}

          
          {/* <LabelSlider
            type="range"
            min="50000"
            max="300000"
            step="500"
            value={interestamount}
            onChange={handleInterestChange}
          /> */}
        </Box>
        {
          invtype==0 && 
          <div style={{
            display:'flex',
            justifyContent:'space-between'
          }}>
              <Label>
              
                <LabelName sx={{
                   marginTop:'14px',
              fontSize:'14px'
            }}>Allotment Fees:</LabelName>
                
              </Label>
              <input type="text" value={`₹ `+userinvest*0.05}
               style={{
               width:'40%',
               fontSize:'14px',
               backgroundColor:'#EBF9F5',
               color:'#50B487'
             }} />
              {/* <TextField
                       required
                       fullWidth
                       name="name"
                       value={`₹ `+userinvest*0.05}
                       type="text"
                       sx={{
                        backgroundColor:'#EBF9F5',
                        fontSize:'14px',
                        width:'40%'
                       }}
                     /> */}
             
              
          </div>
        }
        
        <div style={{
        display:'flex',
        justifyContent:'space-between'
      }}>
          {invtype==0 && <>
          
          

            <Label>
            <LabelName sx={{
               marginTop:'14px',
              fontSize:'14px'
            }}>Allotment date:</LabelName>
            
          </Label>
          <input type="text" value={`1 Mar`}
               style={{
               width:'40%',
               fontSize:'14px',
               backgroundColor:'#EBF9F5',
               color:'#50B487'
             }} />

          </>
          
          }
          
          
      </div>
      {invtype==0 && <Label style={{
        textAlign:'center'
      }} sx={{
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'50px'
      }}>
          
          <LabelName sx={{
            textAlign:'center',
            fontSize:'8px',
            color:'#7c7e8c'
          }}>This 5% application fees is a reservation only. You will have to pay the whole amount on the date of allotment to know more checkout <a href="https://www.venq.in/investing">venq.in/investing</a> 
          </LabelName>
          
        </Label>
      }
        <div style={{
          display:'flex',
          justifyContent:'space-between',
          gap:'30px',
          marginTop:invtype==1?'205px':'0px',
        }}>
          <Button
              type="submit"
              variant="contained"
              style={{ margin: "8px 0" , width:'50%',paddingTop:'10px',paddingBottom:'10px',backgroundColor:'#EBF9F5',borderRadius:'8px',color:'#50B487'}}
              color="primary"
              fullWidth
              onClick={()=>{
                handleRequest(0);
              }}
              // disabled={selectedValue==""}
            >
              ADD TO CART
            </Button>
            {invtype==0 &&
            <Button
            type="submit"
            variant="contained"
            style={{ margin: "8px 0",width:'50%',backgroundColor:'#00b386',borderRadius:'8px'}}
            color="primary"
            fullWidth
            onClick={()=>{
              handleRequest(1);
            }}
            // disabled={selectedValue==""}
          >
            APPLY
          </Button>
            }
            {invtype==1 && 
              <Button
              type="submit"
              variant="contained"
              style={{ margin: "8px 0",width:'50%',backgroundColor:'#00b386',borderRadius:'8px'}}
              color="primary"
              fullWidth
              onClick={handleRequest}
              // disabled={selectedValue==""}
            >
              INVEST
            </Button>
            }
        

        </div>
        
       
          </form>
        </div>
      </StyledPopupinv>
                    </Box>
                    <div style={{

     }}>
      <div style={{
        marginTop:'20px',
        display:'flex',
        justifyContent:'center'
      }}>
      {/* <button  onClick={()=>{
                       window.location.href='https://calendly.com/venqtech/15min';
                       }} style={{
                        alignContent:'center',
                        alignItems:'center',
                        backgroundColor:'#00b386',
                        borderRadius:'5px'
                      }}>
                        Schedule an E-meet  11</button>  */}
      </div>
         
     </div>
                    <ToastContainer />
                    {/* <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px 0",
                      }}
                    >
                      <PriceAddButton onClick={handleTwo}>
                        + RUP 2000
                      </PriceAddButton>
                      <PriceAddButton onClick={handleFive}>
                        + RUP 5000
                      </PriceAddButton>
                      <PriceAddButton onClick={handleTen}>
                        + RUP 10000
                      </PriceAddButton>
                    </Box> */}

                    <Typography
                      style={{
                        fontFamily: "Inter",
                        textAlign: "center",
                        fontSize: "14px",
                        marginTop:'16px'
                      }}
                    >
                      You won't be charged yet
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "20px",
                      color: "grey",
                      padding: "10px",
                    }}
                  >
                    <AutoAwesomeOutlinedIcon />
                    <Typography
                      style={{
                        fontFamily: "Inter",
                        paddingLeft: "10px",
                        fontSize: "14px",
                      }}
                    >
                      3,987 people viewed this property
                    </Typography>
                  </Box>
                </Pricing>
              </Grid>
            )}

            {!isSmallScreen && listing?.islive==2 && (
              <Grid item xs={4} style={{ position: "relative" }}>
                <Pricing>
                  <Box
                    style={{
                      backgroundColor: "white",
                      borderRadius: "20px",
                      padding: "10px",
                    }}
                  >
                    <Box style={{ textAlign: "center", paddingBottom: "10px" }}>
                      <Typography
                        style={{
                          fontSize: "18px",
                          color: "rgb(112,111,111)",
                          fontFamily: "Inter",
                        }}
                      >
                        Property price
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "24px",
                          color: "#0170dc",
                          fontFamily: "Inter",
                        }}
                      >
                        RUP{" "}
                        <b style={{ fontSize: "32px" }}>
                          {listing.propertyprice}
                        </b>
                      </Typography>
                    </Box>

                    {/* <progress
                      value={1634600}
                      max={2059765}
                      style={{ width: "100%" }}
                    /> */}
                    {/* <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "20px",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "rgb(112,111,111)",
                          fontFamily: "Inter",
                        }}
                      >
                        {" "}
                        funded
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "rgb(112,111,111)",
                          fontFamily: "Inter",
                        }}
                      >
                        RUP 4,25,165 available
                      </Typography>
                    </Box> */}

                    {/* <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "10px",
                      }}
                    > */}
                      {/* <Typography
                        style={{
                          color: "rgb(112,111,111)",
                          fontFamily: "Inter",
                        }}
                      >
                        <b style={{ paddingRight: "5px", color: "#0170dc" }}>
                          493
                        </b>
                        investors
                      </Typography> */}
                      {/* <Typography
                        style={{
                          alignItems: "center",
                          display: "flex",
                          color: "red",
                          fontFamily: "Inter",
                        }}
                      >
                        <AccessTimeIcon style={{ paddingRight: "5px" }} /> 56
                        days left
                      </Typography> */}
                    {/* </Box> */}
                    {/* <div>
                      <ProgressBar
                        completed={100}
                        customLabel=""
                        className="wrapper"
                        bgColor="#50B487"
                        labelColor='#50B487'
                        height="0.6rem"
                        // labelClassName="label"
                      />
                      <Typography
                          style={{ fontSize: "14px",color:"black" , fontFamily: "Inter",
                        marginLeft:'5px' }}
                        >
                          100% funded
                        </Typography>
                    </div> */}
                    {/* <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'1.5rem 0'}}> */}
                        {/* <div>
                          <span style={{color:'#50B487',fontWeight:'800'}}>380 </span>
                          <span>investors</span>
                        </div> */}
                      {/* <div style={{display:'flex',alignItems:'center'}}>
                      <img
                        src="/images/clock.png"
                        style={{marginRight:'1rem'}}
                      ></img>
                      <span style={{color:'red'}}> Closed on Mar 31,2024</span>
                      </div>
                    </div> */}

                    <Box
                      style={{
                        backgroundColor: "#f6f7f9",
                        padding: "1px",
                        borderRadius:'15px'
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "1rem 2rem",
                        }}
                      >
                        {/* <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter",
                        marginLeft:'5px' }}
                        >
                          Funding Date
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                            marginRight:'5px'
                          }}
                        >
                          {listing.fundingdate}
                        </Typography> */}
                        <span>
                          Yearly investment return
                        </span>
                        <span style={{fontWeight:800}}>
                          9.8%
                        </span>
                      </Box>
                      
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "1rem 2rem",
                        }}
                      >
                        {/* <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter",
                        marginLeft:'5px' }}
                        >
                          Funding Date
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                            marginRight:'5px'
                          }}
                        >
                          {listing.fundingdate}
                        </Typography> */}
                        <span>
                          Funded date
                        </span>
                        <span style={{fontWeight:800}}>
                          Mar 31, 2024
                        </span>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "1rem 2rem",
                        }}
                      >
                        {/* <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter",
                        marginLeft:'5px' }}
                        >
                          Funding Date
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                            marginRight:'5px'
                          }}
                        >
                          {listing.fundingdate}
                        </Typography> */}
                        <span>
                          Current valuation
                        </span>
                        <span style={{fontWeight:800}}  >
                          RUP 1,100,000
                        </span>
                      </Box>
                      
                      

                      {/* <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Projected gross yield
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.grossyield}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                          paddingBottom: "10px",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Projected net yield
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.netyield}
                        </Typography>
                      </Box> */}
                    </Box>
                    {/* <Box
                      style={{
                        backgroundColor: "#f6f7f9",
                        padding: "0px 20px",
                        borderRadius: "20px",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                          paddingTop: "10px",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Annualised return
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.annualizedreturn}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Annual appreciation
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.annualappreciation}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Projected gross yield
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.grossyield}
                        </Typography>
                      </Box>

                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          margin: "20px 0",
                          paddingBottom: "10px",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "14px", fontFamily: "Inter" }}
                        >
                          Projected net yield
                        </Typography>
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontFamily: "Inter",
                            fontSize: "14px",
                          }}
                        >
                          {listing.netyield}
                        </Typography>
                      </Box>
                    </Box> */}
                    <ReturnsBox style={{marginTop:'1rem'}}>
                    <Box >
                              <Box>Investment starts</Box>
                              {/* {`${listing.annualizedreturn}`} */}
                              <Box
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                {listing.fundingdate}
                              </Box>
                            </Box>
                            <Box>
                              <Box>Min. Investment</Box>
                              {/* {`${listing.annualizedreturn}`} */}
                              <Box
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                {listing.mininvestment}
                              </Box>
                            </Box>
                    </ReturnsBox>
                    
                    

                    <Box
                      style={{
                        display:'flex',
                        alignItems: "center",
                        justifyContent:'space-around',
                        marginTop:'20px',
                        // backgroundColor:'red',
                        padding:'1px',
                        
                      }}
                    >
                      <button  onClick={() => {
                          window.location.href='https://calendly.com/venqtech/15min';
                      }} style={{
                        alignContent:'center',
                        alignItems:'center',
                        color:'#50B487',
                        backgroundColor:'#EBF9F5',
                        borderRadius:'5px'
                      }}>Schedule an E-meet</button>
                      {listing.islive==2 && 
                      
                      <button  onClick={() => setOpen(o => !o)} style={{
                        alignContent:'center',
                        alignItems:'center',
                        backgroundColor:'#00b386',
                        borderRadius:'5px',
                        padding:'10px'
                      }}>I'm Interested</button>
                      }
                      
                      {listing.islive==1 && 
                        <button  onClick={() => setOpenInv(o => !o)} style={{
                          alignContent:'center',
                          alignItems:'center',
                          backgroundColor:'#00b386',
                          borderRadius:'5px',
                          paddingTop:'8px',
                          paddingBottom:'8px',
                          paddingLeft:'11%',
                          paddingRight:'11%'
                        }}>
                          Invest </button>
                      }
                       
                       
                      <StyledPopup open={open} closeOnDocumentClick onClose={closeModal} >
        <div className="modal">
          <a className="close" onClick={closeModal} style={{
            cursor:'pointer'
          }}>
            &times;
          </a>

          <form  onSubmit={handleInterest}>
          <Box>
          <Label>
            <LabelName>Select Amount to invest:</LabelName>
            
          </Label>

          <Label>
          <LabelAmount>RUP {interestamount}</LabelAmount>
          </Label>

          <LabelSlider
            type="range"
            min="50000"
            max="300000"
            step="500"
            value={interestamount}
            onChange={handleInterestChange}
          />
        </Box>
        <Button
              type="submit"
              variant="contained"
              style={{ margin: "8px 0" }}
              color="primary"
              fullWidth
              onClick={handleInterest}
            >
              Show Interest
            </Button>
          </form>
        </div>
      </StyledPopup>
          {/* bada version  */}

      <StyledPopupinv open={openinv} closeOnDocumentClick onClose={closeModalinv} >
        <div className="modal" style={{
          height:'100%',
          // backgroundColor:'red',
          margin:'0px',
          marginTop:'-10px',
          paddingLeft:'18px',
          paddingRight:'18px'
        }}>
          <a className="close" onClick={closeModalinv} style={{
            cursor:'pointer'
          }}>
            &times;
          </a>

          <form style={{
            height:'450px'
          }} onSubmit={handleInterest}>
          <Box>
      <div style={{
        display:'flex',
        justifyContent:'space-evenly'
      }}>
        {/* <div style={{
          display:'flex',
          justifyContent:'space-evenly'
        }}> */}
           <nav style={{
            width:'100%'
           }}>
            <ul style={{
              display:'flex',
              listStyle:'none',
              paddingInlineStart:'0px',
              borderBottom:'1px solid #e9e9eb',
              gap:'20px'
            }}>
              <li style={{
                fontWeight:'bold',
                borderBottom:invtype==0?'2px solid #00b386':'none',
                marginRight:'12px',
                color:invtype==0?'#00b386':'gray',
                cursor:'pointer',
                fontSize:'16px',
                fontFamily:'Inter'

              }} onClick={()=>{
                {!listing.properyheading.includes("Dholera") &&
                setinvtype(0);
              }
              }} >Allotment</li>
              <li style={{
                fontWeight:'bold',
                borderBottom:invtype==1?'2px solid #00b386':'none',
                color:invtype==1?'#00b386':'gray',
                marginRight:'12px',
                cursor:'pointer',
                fontSize:'16px',
                fontFamily:'Inter'

              }} onClick={()=>{
                setinvtype(1);
              }} >Invest</li>

            </ul>
          </nav>
        {/* <Label>
          <LabelName>Allotment:</LabelName>
        </Label>
      <Radio {...controlProps('allotment')} /> */}
        </div>
        {/* <div style={{
          display:'flex',
          justifyContent:'space-evenly'
        }}>
        <Label>
          <LabelName>Invest:</LabelName>
        </Label>
      <Radio {...controlProps('investment')} />
        </div>
      </div> */}
      <div style={{
        display:'flex',
        justifyContent:'space-between'
      }}>
          <Label>
          
            <LabelName sx={{
              fontSize:'14px',
              marginTop:'14px'
            }}>Investment Amount:</LabelName>
            
          </Label>
          {invtype==0 && 
          <input type="text" value={userinvest}
          onChange={(event)=>{
           setUserInvest(event.target.value);
          }}  style={{
            width:'40%',
            fontSize:'14px',
            backgroundColor:'#EBF9F5',
            color:'#50B487'
          }} />
          //   <TextField
          //   required
          //   name="userinvestmentamount"
          //   value={userinvest}
          //   onChange={(event)=>{
          //    setUserInvest(event.target.value);
          //   }}
          //  //  label="Enter your email"
          //  sx={{
          //    width:'40%',
          //    fontSize:'14px',
          //    backgroundColor:'#EBF9F5',
          //    color:'#50B487'
          //  }}
          //   type="text"
          // />
          }
          {invtype==1 && 
             <input type="text" value={userinvestone}
             onChange={(event)=>{
              setUserInvest(event.target.value);
             }}  style={{
               width:'40%',
               fontSize:'14px',
               backgroundColor:'#EBF9F5',
               color:'#50B487'
             }} />
          }
          
      </div>
          {invtype==0 && 
          <>
          <Box sx={{ width:'90%',alignItems:'center',justifyContent:'center',marginLeft:'16px' }}>
      <Slider
        aria-label="Temperature"
        defaultValue={5000}
        getAriaValueText={valuetext}
        min={5000}
        max={305000}
        step={30000}
        marks={marks}
        onChange={handleUserInvestChange}
      />
    </Box>
            
          </>
          }
          {invtype==1 && <>
           
            <Box sx={{ width:'90%',alignItems:'center',justifyContent:'center',marginLeft:'16px' }}>
      <Slider
        aria-label="Temperature"
        defaultValue={5000}
        getAriaValueText={valuetext}
        min={5000}
        max={310000}
        step={50000}
        marks={marks}
        onChange={handleUserInvestChangeOne}
      />
    </Box>
          </>}

          
          {/* <LabelSlider
            type="range"
            min="50000"
            max="300000"
            step="500"
            value={interestamount}
            onChange={handleInterestChange}
          /> */}
        </Box>
        {
          invtype==0 && 
          <div style={{
            display:'flex',
            justifyContent:'space-between'
          }}>
              <Label>
              
                <LabelName sx={{
                   marginTop:'14px',
              fontSize:'14px'
            }}>Allotment Fees:</LabelName>
                
              </Label>
              <input type="text" value={`₹ `+userinvest*0.05}
               style={{
               width:'40%',
               fontSize:'14px',
               backgroundColor:'#EBF9F5',
               color:'#50B487'
             }} />
              {/* <TextField
                       required
                       fullWidth
                       name="name"
                       value={`₹ `+userinvest*0.05}
                       type="text"
                       sx={{
                        backgroundColor:'#EBF9F5',
                        fontSize:'14px',
                        width:'40%'
                       }}
                     /> */}
             
              
          </div>
        }
        
        <div style={{
        display:'flex',
        justifyContent:'space-between'
      }}>
          {invtype==0 && <>
          
          

            <Label>
            <LabelName sx={{
               marginTop:'14px',
              fontSize:'14px'
            }}>Allotment date:</LabelName>
            
          </Label>
          <input type="text" value={`1 Mar`}
               style={{
               width:'40%',
               fontSize:'14px',
               backgroundColor:'#EBF9F5',
               color:'#50B487'
             }} />

          </>
          
          }
          
          
      </div>
      {invtype==0 && <Label style={{
        textAlign:'center'
      }} sx={{
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'50px'
      }}>
          
          <LabelName sx={{
            textAlign:'center',
            fontSize:'8px',
            color:'#7c7e8c'
          }}>This 5% application fees is a reservation only. You will have to pay the whole amount on the date of allotment to know more checkout <a href="https://www.venq.in/investing">venq.in/investing</a> 
          </LabelName>
          
        </Label>
      }
        <div style={{
          display:'flex',
          justifyContent:'space-between',
          gap:'30px',
          marginTop:invtype==1?'205px':'0px',
        }}>
          <Button
              type="submit"
              variant="contained"
              style={{ margin: "8px 0" , width:'50%',paddingTop:'10px',paddingBottom:'10px',backgroundColor:'#EBF9F5',borderRadius:'8px',color:'#50B487'}}
              color="primary"
              fullWidth
              onClick={()=>{
                handleRequest(0);
              }}
              // disabled={selectedValue==""}
            >
              ADD TO CART
            </Button>
            {invtype==0 &&
            <Button
            type="submit"
            variant="contained"
            style={{ margin: "8px 0",width:'50%',backgroundColor:'#00b386',borderRadius:'8px'}}
            color="primary"
            fullWidth
            onClick={()=>{
              handleRequest(1);
            }}
            // disabled={selectedValue==""}
          >
            APPLY
          </Button>
            }
            {invtype==1 && 
              <Button
              type="submit"
              variant="contained"
              style={{ margin: "8px 0",width:'50%',backgroundColor:'#00b386',borderRadius:'8px'}}
              color="primary"
              fullWidth
              onClick={handleRequest}
              // disabled={selectedValue==""}
            >
              INVEST
            </Button>
            }
        

        </div>
        
       
          </form>
        </div>
      </StyledPopupinv>
                    </Box>
                    <div style={{

     }}>
      <div style={{
        marginTop:'20px',
        display:'flex',
        justifyContent:'center'
      }}>
      {/* <button  onClick={()=>{
                       window.location.href='https://calendly.com/venqtech/15min';
                       }} style={{
                        alignContent:'center',
                        alignItems:'center',
                        backgroundColor:'#00b386',
                        borderRadius:'5px'
                      }}>
                        Schedule an E-meet  11</button>  */}
      </div>
         
     </div>
                    <ToastContainer />
                    {/* <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px 0",
                      }}
                    >
                      <PriceAddButton onClick={handleTwo}>
                        + RUP 2000
                      </PriceAddButton>
                      <PriceAddButton onClick={handleFive}>
                        + RUP 5000
                      </PriceAddButton>
                      <PriceAddButton onClick={handleTen}>
                        + RUP 10000
                      </PriceAddButton>
                    </Box> */}

                    <Typography
                      style={{
                        fontFamily: "Inter",
                        textAlign: "center",
                        fontSize: "14px",
                        marginTop:'16px'
                      }}
                    >
                      You won't be charged yet
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "20px",
                      color: "grey",
                      padding: "10px",
                    }}
                  >
                    <AutoAwesomeOutlinedIcon />
                    <Typography
                      style={{
                        fontFamily: "Inter",
                        paddingLeft: "10px",
                        fontSize: "14px",
                      }}
                    >
                      3,987 people viewed this property
                    </Typography>
                  </Box>
                </Pricing>
              </Grid>
            )}
          </Grid>
        </Box>
        {isSmallScreen && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
              color: "grey",
              padding: "10px",
            }}
          >
            <AutoAwesomeOutlinedIcon />
            <Typography
              style={{
                fontFamily: "Inter",
                paddingLeft: "10px",
                fontSize: "14px",
              }}
            >
              3,987 people viewed this property
            </Typography>
          </Box>
        )}

        {!isEditMode && isAdmin && (
          <button onClick={handleEditClick}>Edit</button>
        )}
        <Box>
          {isSmallScreen && (
            <Options style={{ marginTop: "30px" }}>
              <HelpIcon />
              <Heading>Help and Support</Heading>
            </Options>
          )}
        </Box>
        {isSmallScreen && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%",
              paddingTop:'10px',
              paddingBottom:'10px',
              backgroundColor: "white", // Customize the background color
              borderTop: "1px solid grey",
              display: "flex",
              flexDirection:'column',
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box
                      style={{
                        width:'100%',
                        display:'flex',
                        justifyContent:'space-evenly',
                        alignItems: "center",
                      }}
                    >
                        <button  onClick={() => {
                          window.location.href='https://calendly.com/venqtech/15min';
                      }} style={{
                        alignContent:'center',
                        alignItems:'center',
                        color:'#50B487',
                        backgroundColor:'#EBF9F5',
                        borderRadius:'5px'
                      }}>Schedule an E-meet</button>
                      {listing.islive==2 && 
                      
                      <button  onClick={() => setOpen(o => !o)} style={{
                        alignContent:'center',
                        alignItems:'center',
                        backgroundColor:'#00b386',
                        borderRadius:'5px',
                        padding:'10px'
                      }}>I'm Interested</button>
                      }
                      
                      {listing.islive==1 && 
                        <button  onClick={() => setOpenInv(o => !o)} style={{
                          alignContent:'center',
                          alignItems:'center',
                          backgroundColor:'#00b386',
                          borderRadius:'5px',
                          paddingTop:'8px',
                          paddingBottom:'8px',
                          paddingLeft:'11%',
                          paddingRight:'11%'
                        }}>
                          Invest </button>
                      }
                      <StyledPopup open={open} closeOnDocumentClick onClose={closeModal} >
        <div className="modal">
        <div>
        <a className="close" onClick={closeModal} >
            &times;
          </a>
        </div>
          

          <form onSubmit={handleInterest}>
          <Box>
          <Label>
            <LabelName>Select Amount to invest:</LabelName>
           
          </Label>
          <Label>
          <LabelAmount>RUP {interestamount}</LabelAmount>
          </Label>

          <LabelSlider
            type="range"
            min="50000"
            max="300000"
            step="500"
            value={interestamount}
            onChange={handleInterestChange}
          />
        </Box>
        <Button
              type="submit"
              variant="contained"
              style={{ margin: "8px 0" }}
              color="primary"
              fullWidth
              onClick={handleInterest}
            >
              Show Interest 
            </Button>
          </form>
        </div>
      </StyledPopup>

      {/* chota version */}
      <StyledPopupinvSmall open={openinv} closeOnDocumentClick onClose={closeModalinv} >
        <div className="modal" style={{
          height:'100%',
          // backgroundColor:'red',
          margin:'0px',
          marginTop:'-10px',
          paddingLeft:'18px',
          paddingRight:'18px'
        }}>
          <a className="close" onClick={closeModalinv} style={{
            cursor:'pointer'
          }}>
            &times;
          </a>

          <form style={{
            height:'450px'
          }} onSubmit={handleInterest}>
          <Box>
      <div style={{
        display:'flex',
        justifyContent:'space-evenly'
      }}>
        {/* <div style={{
          display:'flex',
          justifyContent:'space-evenly'
        }}> */}
           <nav style={{
            width:'100%'
           }}>
            <ul style={{
              display:'flex',
              listStyle:'none',
              paddingInlineStart:'0px',
              borderBottom:'1px solid #e9e9eb',
              gap:'20px'
            }}>
              <li style={{
                fontWeight:'bold',
                borderBottom:invtype==0?'2px solid #00b386':'none',
                marginRight:'12px',
                color:invtype==0?'#00b386':'gray',
                cursor:'pointer',
                fontSize:'16px',
                fontFamily:'Inter'

              }} onClick={()=>{
                setinvtype(0);
              }} >Allotment</li>
              <li style={{
                fontWeight:'bold',
                borderBottom:invtype==1?'2px solid #00b386':'none',
                color:invtype==1?'#00b386':'gray',
                marginRight:'12px',
                cursor:'pointer',
                fontSize:'16px',
                fontFamily:'Inter'

              }} onClick={()=>{
                setinvtype(1);
              }} >Invest</li>

            </ul>
          </nav>
        {/* <Label>
          <LabelName>Allotment:</LabelName>
        </Label>
      <Radio {...controlProps('allotment')} /> */}
        </div>
        {/* <div style={{
          display:'flex',
          justifyContent:'space-evenly'
        }}>
        <Label>
          <LabelName>Invest:</LabelName>
        </Label>
      <Radio {...controlProps('investment')} />
        </div>
      </div> */}
      <div style={{
        display:'flex',
        justifyContent:'space-between'
      }}>
          <Label>
          
            <LabelName sx={{
              fontSize:'14px',
              marginTop:'14px'
            }}>Investment Amount:</LabelName>
            
          </Label>
          {invtype==0 && 
          <input type="text" value={userinvest}
          onChange={(event)=>{
           setUserInvest(event.target.value);
          }}  style={{
            width:'40%',
            fontSize:'14px',
            backgroundColor:'#EBF9F5',
            color:'#50B487'
          }} />
          //   <TextField
          //   required
          //   name="userinvestmentamount"
          //   value={userinvest}
          //   onChange={(event)=>{
          //    setUserInvest(event.target.value);
          //   }}
          //  //  label="Enter your email"
          //  sx={{
          //    width:'40%',
          //    fontSize:'14px',
          //    backgroundColor:'#EBF9F5',
          //    color:'#50B487'
          //  }}
          //   type="text"
          // />
          }
          {invtype==1 && 
             <input type="text" value={userinvestone}
             onChange={(event)=>{
              setUserInvest(event.target.value);
             }}  style={{
               width:'40%',
               fontSize:'14px',
               backgroundColor:'#EBF9F5',
               color:'#50B487'
             }} />
          }
          
      </div>
          {invtype==0 && 
          <>
          <Box sx={{ width:'90%',alignItems:'center',justifyContent:'center',marginLeft:'16px' }}>
      <Slider
        aria-label="Temperature"
        defaultValue={5000}
        getAriaValueText={valuetext}
        min={5000}
        max={305000}
        step={30000}
        marks={marks}
        onChange={handleUserInvestChange}
      />
    </Box>
            
          </>
          }
          {invtype==1 && <>
           
            <Box sx={{ width:'90%',alignItems:'center',justifyContent:'center',marginLeft:'16px' }}>
      <Slider
        aria-label="Temperature"
        defaultValue={5000}
        getAriaValueText={valuetext}
        min={5000}
        max={310000}
        step={50000}
        marks={marks}
        onChange={handleUserInvestChangeOne}
      />
    </Box>
          </>}

          
          {/* <LabelSlider
            type="range"
            min="50000"
            max="300000"
            step="500"
            value={interestamount}
            onChange={handleInterestChange}
          /> */}
        </Box>
        {
          invtype==0 && 
          <div style={{
            display:'flex',
            justifyContent:'space-between'
          }}>
              <Label>
              
                <LabelName sx={{
                   marginTop:'14px',
              fontSize:'14px'
            }}>Allotment Fees:</LabelName>
                
              </Label>
              <input type="text" value={`₹ `+userinvest*0.05}
               style={{
               width:'40%',
               fontSize:'14px',
               backgroundColor:'#EBF9F5',
               color:'#50B487'
             }} />
              {/* <TextField
                       required
                       fullWidth
                       name="name"
                       value={`₹ `+userinvest*0.05}
                       type="text"
                       sx={{
                        backgroundColor:'#EBF9F5',
                        fontSize:'14px',
                        width:'40%'
                       }}
                     /> */}
             
              
          </div>
        }
        
        <div style={{
        display:'flex',
        justifyContent:'space-between'
      }}>
          {invtype==0 && <>
          
          

            <Label>
            <LabelName sx={{
               marginTop:'14px',
              fontSize:'14px'
            }}>Allotment date:</LabelName>
            
          </Label>
          <input type="text" value={`1 Mar`}
               style={{
               width:'40%',
               fontSize:'14px',
               backgroundColor:'#EBF9F5',
               color:'#50B487'
             }} />

          </>
          
          }
          
          
      </div>
      {invtype==0 && <Label style={{
        textAlign:'center'
      }} sx={{
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'50px'
      }}>
          
          <LabelName sx={{
            textAlign:'center',
            fontSize:'8px',
            color:'#7c7e8c'
          }}>This 5% application fees is a reservation only. You will have to pay the whole amount on the date of allotment to know more checkout <a href="https://www.venq.in/investing">venq.in/investing</a> 
          </LabelName>
          
        </Label>
      }
        <div style={{
          display:'flex',
          justifyContent:'space-between',
          gap:'10px',
          marginTop:invtype==1?'205px':'0px',
        }}>
          <Button
              type="submit"
              variant="contained"
              style={{ marginBottom: "18px" , width:'130px',backgroundColor:'#EBF9F5',borderRadius:'8px',color:'#50B487'}}
              color="primary"
              fullWidth
              onClick={()=>{
                handleRequest(0)
              }}
              // disabled={selectedValue==""}
            >
              ADD TO CART
            </Button>
            {invtype==0 &&
            <Button
            type="submit"
            variant="contained"
            style={{ marginBottom: "18px",width:'130px',backgroundColor:'#00b386',borderRadius:'8px'}}
            color="primary"
            fullWidth
            onClick={()=>{
              handleRequest(1);
            }}
            // disabled={selectedValue==""}
          >
            APPLY
          </Button>
            }
            {invtype==1 && 
              <Button
              type="submit"
              variant="contained"
              style={{ marginBottom: "18px",width:'130px',backgroundColor:'#00b386',borderRadius:'8px'}}
              color="primary"
              fullWidth
              onClick={handleRequest}
              // disabled={selectedValue==""}
            >
              INVEST
            </Button>
            }
        

        </div>
        
       
          </form>
        </div>
      </StyledPopupinvSmall>
                    </Box>

          </div>
        )}

      </Box>
    </div>
  );
};

export default PropertyItem;
