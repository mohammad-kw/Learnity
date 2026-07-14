import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
  COURSE_ENROLL_FREE_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
//     const toastId = toast.loading("Loading...");
//     try{
//         //load the script
//         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//         if(!res) {
//             toast.error("RazorPay SDK failed to load");
//             return;
//         }

//         //initiate the order
//         const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
//                                 {courses},
//                                 {
//                                     Authorization: `Bearer ${token}`,
//                                 })

//         if(!orderResponse.data.success) {
//             throw new Error(orderResponse.data.message);
//         }
//         console.log("PRINTING orderResponse", orderResponse);
//         //options
//         const options = {
//             key: process.env.RAZORPAY_KEY,
//             currency: orderResponse.data.message.currency,
//             amount: `${orderResponse.data.message.amount}`,
//             order_id:orderResponse.data.message.id,
//             name:"StudyNotion",
//             description: "Thank You for Purchasing the Course",
//             image:rzpLogo,
//             prefill: {
//                 name:`${userDetails.firstName}`,
//                 email:userDetails.email
//             },
//             handler: function(response) {
//                 //send successful wala mail
//                 sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
//                 //verifyPayment
//                 verifyPayment({...response, courses}, token, navigate, dispatch);
//             }
//         }
//         //miss hogya tha
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//         paymentObject.on("payment.failed", function(response) {
//             toast.error("oops, payment failed");
//             console.log(response.error);
//         })

//     }
//     catch(error) {
//         console.log("PAYMENT API ERROR.....", error);
//         toast.error("Could not make Payment");
//     }
//     toast.dismiss(toastId);
// }

// async function sendPaymentSuccessEmail(response, amount, token) {
//     try{
//         await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
//             orderId: response.razorpay_order_id,
//             paymentId: response.razorpay_payment_id,
//             amount,
//         },{
//             Authorization: `Bearer ${token}`
//         })
//     }
//     catch(error) {
//         console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
//     }
// }

// //verify payment
// async function verifyPayment(bodyData, token, navigate, dispatch) {
//     const toastId = toast.loading("Verifying Payment....");
//     dispatch(setPaymentLoading(true));
//     try{
//         const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
//             Authorization:`Bearer ${token}`,
//         })

//         if(!response.data.success) {
//             throw new Error(response.data.message);
//         }
//         toast.success("payment Successful, ypou are addded to the course");
//         navigate("/dashboard/enrolled-courses");
//         dispatch(resetCart());
//     }
//     catch(error) {
//         console.log("PAYMENT VERIFY ERROR....", error);
//         toast.error("Could not verify Payment");
//     }
//     toast.dismiss(toastId);
//     dispatch(setPaymentLoading(false));
// }

// import { toast } from "react-hot-toast";
// import { studentEndpoints } from "../apis";
// import { apiConnector } from "../apiconnector";
// import rzpLogo from "../../assets/Logo/rzp_logo.png";
// import { setPaymentLoading } from "../../slices/courseSlice";
// import { resetCart } from "../../slices/cartSlice";

// const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;

//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// }

// export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
//   const toastId = toast.loading("Loading...");
//   try {
//     // Load the Razorpay script
//     // console.log("razorpay api working")
//     const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//     if (!res) {
//       toast.error("RazorPay SDK failed to load");
//       return;
//     }
//     console.log("razorpay api working")

//     // Initiate the order
//     const orderResponse = await apiConnector(
//       "POST",
//       COURSE_PAYMENT_API,
//       { courses },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     // Log the response to understand its structure
//     console.log("Order Response Data: ", orderResponse.data);

//     // Access fields correctly based on the structure
//     const data = orderResponse.data;
//     const currency = data.currency;
//     const amount = data.amount;
//     const id = data.id;

//     if (!currency || !amount || !id) {
//       throw new Error("Invalid payment data received from server");
//     }

//     // Set up Razorpay options
//     const options = {
//       key: process.env.RAZORPAY_KEY,
//       currency,
//       amount: `${amount}`,
//       order_id: id,
//       name: "StudyNotion",
//       description: "Thank you for purchasing the course",
//       image: rzpLogo,
//       prefill: {
//         name: `${userDetails.firstName}`,
//         email: userDetails.email,
//       },
//       handler: function (response) {
//         // Send payment success email
//         sendPaymentSuccessEmail(response, amount, token);
//         // Verify payment
//         verifyPayment({ ...response, courses }, token, navigate, dispatch);
//       },
//     };

//     // Open Razorpay payment window
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//     paymentObject.on("payment.failed", function (response) {
//       toast.error("Oops, payment failed");
//       console.log(response.error);
//     });
//   } catch (error) {
//     console.log("PAYMENT API ERROR.....", error);
//     toast.error("Could not make Payment");
//   }
//   toast.dismiss(toastId);
// }

// async function sendPaymentSuccessEmail(response, amount, token) {
//   try {
//     await apiConnector(
//       "POST",
//       SEND_PAYMENT_SUCCESS_EMAIL_API,
//       {
//         orderId: response.razorpay_order_id,
//         paymentId: response.razorpay_payment_id,
//         amount,
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );
//   } catch (error) {
//     console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
//   }
// }

// async function verifyPayment(bodyData, token, navigate, dispatch) {
//   const toastId = toast.loading("Verifying Payment....");
//   dispatch(setPaymentLoading(true));
//   try {
//     const response = await apiConnector(
//       "POST",
//       COURSE_VERIFY_API,
//       bodyData,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (!response.data.success) {
//       throw new Error(response.data.message || "Payment verification failed");
//     }

//     toast.success("Payment Successful! You have been added to the course");
//     navigate("/dashboard/enrolled-courses");
//     dispatch(resetCart());
//   } catch (error) {
//     console.log("PAYMENT VERIFY ERROR....", error);
//     toast.error("Could not verify Payment");
//   }
//   toast.dismiss(toastId);
//   dispatch(setPaymentLoading(false));
// }

// export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
//   const toastId = toast.loading("Loading...");
//   try {
//       // Load the Razorpay script
//       const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
//       if (!res) {
//           toast.error("RazorPay SDK failed to load");
//           return;
//       }

//       // Initiate the order
//       const orderResponse = await apiConnector(
//           "POST",
//           COURSE_PAYMENT_API,
//           { courses },
//           {
//               Authorization: `Bearer ${token}`,
//           }
//       );

//       // Debug logs to see the exact structure
//       console.log("Full Order Response:", orderResponse);
//       console.log("Order Data:", orderResponse?.data);
//       console.log("Order Message:", orderResponse?.data?.data);  // Check if it's data.data instead of data.message

//       // First check if the response is successful
//       if (!orderResponse?.data?.success) {
//           throw new Error(orderResponse?.data?.message || "Failed to create order");
//       }

//       // Get the correct path to order data
//       const orderData = orderResponse?.data?.data || orderResponse?.data?.message;
//       console.log("Order Data extracted:", orderData);

//       // Log specific fields we're trying to access
//       console.log("Currency:", orderData?.currency);
//       console.log("Amount:", orderData?.amount);
//       console.log("Order ID:", orderData?.id);

//       // Validate essential fields
//       if (!orderData) {
//           throw new Error("Order data is missing");
//       }

//       //options
//       const options = {
//           key: process.env.RAZORPAY_KEY,
//           currency: orderData.currency || 'INR',  // Provide default value
//           amount: orderData.amount ? `${orderData.amount}` : '0',
//           order_id: orderData.id,
//           name: "StudyNotion",
//           description: "Thank You for Purchasing the Course",
//           image: rzpLogo,
//           prefill: {
//               name: userDetails?.firstName || '',
//               email: userDetails?.email || ''
//           },
//           handler: async function(response) {
//               try {
//                   await sendPaymentSuccessEmail(response, orderData.amount, token);
//                   await verifyPayment({...response, courses}, token, navigate, dispatch);
//               } catch (error) {
//                   console.error("Payment handling error:", error);
//                   toast.error("Payment successful but couldn't complete enrollment");
//               }
//           }
//       };

//       // Initialize Razorpay
//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();

//       // Handle payment failure
//       paymentObject.on("payment.failed", function(response) {
//           toast.error("Payment failed. Please try again");
//           console.error("Payment failed:", response.error);
//       });

//   } catch (error) {
//       console.error("PAYMENT API ERROR.....", error);
//       toast.error(error.message || "Could not make Payment");
//   } finally {
//       toast.dismiss(toastId);
//   }
// }

// async function sendPaymentSuccessEmail(response, amount, token) {
//   try {
//       await apiConnector(
//           "POST",
//           SEND_PAYMENT_SUCCESS_EMAIL_API,
//           {
//               orderId: response.razorpay_order_id,
//               paymentId: response.razorpay_payment_id,
//               amount,
//           },
//           {
//               Authorization: `Bearer ${token}`
//           }
//       );
//   } catch (error) {
//       console.error("PAYMENT SUCCESS EMAIL ERROR....", error);
//   }
// }

// async function verifyPayment(bodyData, token, navigate, dispatch) {
//   const toastId = toast.loading("Verifying Payment....");
//   dispatch(setPaymentLoading(true));
//   try {
//       const response = await apiConnector(
//           "POST",
//           COURSE_VERIFY_API,
//           bodyData,
//           {
//               Authorization: `Bearer ${token}`,
//           }
//       );

//       if (!response.data.success) {
//           throw new Error(response.data.message);
//       }
//       toast.success("Payment successful, you are added to the course");
//       navigate("/dashboard/enrolled-courses");
//       dispatch(resetCart());
//   } catch (error) {
//       console.error("PAYMENT VERIFY ERROR....", error);
//       toast.error("Could not verify Payment");
//   } finally {
//       toast.dismiss(toastId);
//       dispatch(setPaymentLoading(false));
//   }
// }

// Main payment function
export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch,
) {
  // Only students can purchase courses. Guard early so instructors/admins get a
  // clear message instead of waiting for the Razorpay script + a 401 from the API.
  if (userDetails?.accountType && userDetails.accountType !== "Student") {
    toast.error("Only students can purchase courses.");
    return;
  }

  // When Razorpay is unavailable/blocked (or keys aren't configured), enroll the
  // student directly for free. Set REACT_APP_PAYMENTS_ENABLED=true to use Razorpay.
  if (process.env.REACT_APP_PAYMENTS_ENABLED !== "true") {
    return enrollCourseFree(token, courses, navigate, dispatch);
  }

  const toastId = toast.loading("Loading...");
  try {
    // Load the Razorpay script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    if (!res) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    // Verify required parameters
    if (!token || !courses || !userDetails) {
      throw new Error("Missing required parameters for payment");
    }

    // Initiate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      },
    );

    // Validate order response
    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse?.data?.message || "Could not create order");
    }

    // Get order data from response
    const orderData = orderResponse?.data?.data;

    if (!orderData) {
      throw new Error("Order data not received");
    }

    // Configure Razorpay options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderData.currency || "INR",
      amount: `${orderData.amount}`,
      order_id: orderData.id,
      name: "Learnity",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: userDetails?.firstName || "",
        email: userDetails?.email || "",
      },
      handler: async function (response) {
        try {
          // Verify the payment first
          await verifyPayment(
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              courses: courses,
            },
            token,
            navigate,
            dispatch,
          );

          // Send success email after verification
          await sendPaymentSuccessEmail(response, orderData.amount, token);
        } catch (error) {
          console.error("Payment Handler Error:", error);
          toast.error("Payment successful but enrollment failed");
        }
      },
    };

    // Initialize Razorpay
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // Handle payment failure
    paymentObject.on("payment.failed", function (failureResponse) {
      console.error("Payment Failed Response:", failureResponse.error);
      toast.error(failureResponse.error?.description || "Payment failed");
    });
  } catch (error) {
    console.error("Buy Course Error:", error);
    toast.error(error.message || "Could not initiate payment");
  } finally {
    toast.dismiss(toastId);
  }
}

// Free enrollment: enrolls the student directly without Razorpay.
async function enrollCourseFree(token, courses, navigate, dispatch) {
  const toastId = toast.loading("Enrolling...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector(
      "POST",
      COURSE_ENROLL_FREE_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not enroll");
    }

    toast.success("Enrolled successfully!");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.error("FREE ENROLL ERROR:", error);
    toast.error(
      error?.response?.data?.message || error.message || "Could not enroll",
    );
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}

// Verify payment function
export async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    // Verify required data
    if (
      !bodyData.razorpay_payment_id ||
      !bodyData.razorpay_order_id ||
      !bodyData.razorpay_signature ||
      !bodyData.courses
    ) {
      throw new Error("Missing payment verification data");
    }

    // Make verification API call
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    // Check verification response
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Payment verification failed");
    }

    // Check enrolled courses in response
    if (!response?.data?.enrolledCourses) {
      console.warn("No enrolled courses data in response");
    }

    // Success flow
    toast.success("Payment successful, you are added to the course");
    dispatch(resetCart());
    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    console.error("Payment Verification Error:", error);
    toast.error("Could not verify payment. Please contact support");
    navigate("/dashboard"); // Fallback navigation
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}

// Send success email function
export async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    // Verify required data
    if (
      !response?.razorpay_order_id ||
      !response?.razorpay_payment_id ||
      !amount
    ) {
      console.error("Missing data for success email");
      return;
    }

    // Send success email
    const emailResponse = await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );

    if (!emailResponse?.data?.success) {
      console.warn("Success email might not have been sent");
    }
  } catch (error) {
    console.error("Success Email Error:", error);
    // Don't throw error as email is not critical
  }
}
