export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  sizes: string[];
  colors: string[];
  badge?: 'LIMITED' | 'SOLD OUT' | 'RESTOCK SOON';
  isFlashDeal?: boolean;
  flashDealEndsAt?: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "WATERBURV",
    price: 129,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcKkVrC7hlJmE8UKRs1NkORpFSAGV_7Mi8T1RFaLcEMa5tlAMTKIfVAmEP0KRZVmyfA1WnruQQTPMPtYLE536ABRUUbatsU2AMkNRpG01A5HTb8czZysW_4c45q9fWU-t-iKm8OYhMlmzgfRWbVdZj7NOI1sKyiU2fupJRVNJLRnE6SzZ9CnMJRmb2MwBK/s1035/B943DB38-B032-4E29-90CD-F496B00044B9.jpeg",
    gallery: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcKkVrC7hlJmE8UKRs1NkORpFSAGV_7Mi8T1RFaLcEMa5tlAMTKIfVAmEP0KRZVmyfA1WnruQQTPMPtYLE536ABRUUbatsU2AMkNRpG01A5HTb8czZysW_4c45q9fWU-t-iKm8OYhMlmzgfRWbVdZj7NOI1sKyiU2fupJRVNJLRnE6SzZ9CnMJRmb2MwBK/s1035/B943DB38-B032-4E29-90CD-F496B00044B9.jpeg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6l5n5iH7VNSHLlWKwkExxfI_XLoByEgHU90kvHlHxEyDmGszzqTr8xkL30dTEH4zSWrvkohcni5RU35a0kHsZXmehTy6yR4griz8ra-PAKHxDbFw2U-7L8bpMP9L0X_tTOTaT_bwdUAyjthAnM5wS1dGLumfBiid5R1a_7aOaaDCEUDC2-G3nRSBfs6NZ/s1035/0F809C67-CAF2-4198-B0C8-EDB82614D9BF.jpeg"
    ],
    description: "Heavyweight premium cotton hoodie. Oversized fit. Minimalist branding.",
    sizes: ["1L"],
    colors: ["Black"],
    badge: "LIMITED",
    isFlashDeal: true,
    flashDealEndsAt: new Date(Date.now() + 896400000).toISOString(), // 24 hours from now
  },
  {
    id: "p2",
    name: "BURVZS TEST ",
    price: 259,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8QzGa2uoBvJJavIzzNxfn8CFPUd0w5wfgq8jVMljrL7CssD2RWGg6A8mlo-GUChC5O3CzhSCFi-NzWZXmM77Ael4acORkXuXLXRDpofBwMDaD49B1DAoLYQX_tyuCv0Wdr9VjOpd3dyG-FFE63X4JFg8hLW8e7SMaocVZaH3mQtA6Q1hrGHpllZG6s6-j/s4096/AFC68B24-37E2-4B18-ABAD-488A6668D630.jpeg",
    gallery: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8QzGa2uoBvJJavIzzNxfn8CFPUd0w5wfgq8jVMljrL7CssD2RWGg6A8mlo-GUChC5O3CzhSCFi-NzWZXmM77Ael4acORkXuXLXRDpofBwMDaD49B1DAoLYQX_tyuCv0Wdr9VjOpd3dyG-FFE63X4JFg8hLW8e7SMaocVZaH3mQtA6Q1hrGHpllZG6s6-j/s4096/AFC68B24-37E2-4B18-ABAD-488A6668D630.jpeg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8QzGa2uoBvJJavIzzNxfn8CFPUd0w5wfgq8jVMljrL7CssD2RWGg6A8mlo-GUChC5O3CzhSCFi-NzWZXmM77Ael4acORkXuXLXRDpofBwMDaD49B1DAoLYQX_tyuCv0Wdr9VjOpd3dyG-FFE63X4JFg8hLW8e7SMaocVZaH3mQtA6Q1hrGHpllZG6s6-j/s4096/AFC68B24-37E2-4B18-ABAD-488A6668D630.jpeg"
    ],
    description: "Technical cargo pants with adjustable straps and hidden pockets.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    badge: "RESTOCK SOON",
  },
  {
    id: "p3",
    name: "TRACKSUIT BURVZS",
    price: 549,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjuRs03nq6U6fl84e0zHJBpUGtRnVU-zdyl7q0BgKKKu18CsWFFsgDPn54EA1SNgLuCoEKDMEoKgkD_xb5WVRER-YG8_nI2F5qsQTzgckbr11BqOTRoxxrpFDqkFMPi0HPhuIGgDdN2hWTdPQjTC5Du6VcgjikyTXGeQG4aSyHRh3fPpEDxi8IZUD8iyvSu/s883/8C12A85A-77EF-4A4F-81F8-6CD3EE9C6379.jpeg",
    gallery: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjuRs03nq6U6fl84e0zHJBpUGtRnVU-zdyl7q0BgKKKu18CsWFFsgDPn54EA1SNgLuCoEKDMEoKgkD_xb5WVRER-YG8_nI2F5qsQTzgckbr11BqOTRoxxrpFDqkFMPi0HPhuIGgDdN2hWTdPQjTC5Du6VcgjikyTXGeQG4aSyHRh3fPpEDxi8IZUD8iyvSu/s883/8C12A85A-77EF-4A4F-81F8-6CD3EE9C6379.jpeg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhha1X2FOlLbFdgzm3smTSqD0s9c0gevFJAzz8NlgXty1EdAKK9NX_ezJk-OQSgMW5WCCppbaIwhEUL6mVcVXAHongFxe8WmLiG-Z6RfO345nHRshwBGF25mB-wXIjTrn9pUWyEbBL2y9D0MoxAQqrGF64adZ5vXw-9VjGL2X70IHcQQ7yi4Q-XFDPGblH6/s828/7A10B93E-6FD3-4AD4-9CF4-F5B13A66FCEB.jpeg"
    ],
    description: "Boxy fit heavyweight JACKET. Drop shoulder. Silicone logo patch.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    isFlashDeal: true,
    flashDealEndsAt: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
  },
  {
    id: "p4",
    name: "BURVZS SPECSHIRT",
    price: 229,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8ob3UN70PT2bfgFSbePsoeNTRxuhgwbbeHNywKso3gK_Z7dZAZ73QLUVbaLNDmybdHSb7_o1F4wdw0PVlhyphenhyphenQI3_xiJmvQ1RJvYD2HPn_lnwf6VIKwm_vx9fMtb0kUh4j4xoPgB_QeE81wsYHdPKkpvLbuDqkyS9h_ycKbEZ-7VCSjxpq-XYR80oAeTcKL/s1104/6E5FC3E0-5331-47EC-916E-360408989574.jpeg",
    gallery: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8ob3UN70PT2bfgFSbePsoeNTRxuhgwbbeHNywKso3gK_Z7dZAZ73QLUVbaLNDmybdHSb7_o1F4wdw0PVlhyphenhyphenQI3_xiJmvQ1RJvYD2HPn_lnwf6VIKwm_vx9fMtb0kUh4j4xoPgB_QeE81wsYHdPKkpvLbuDqkyS9h_ycKbEZ-7VCSjxpq-XYR80oAeTcKL/s1104/6E5FC3E0-5331-47EC-916E-360408989574.jpeg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8ob3UN70PT2bfgFSbePsoeNTRxuhgwbbeHNywKso3gK_Z7dZAZ73QLUVbaLNDmybdHSb7_o1F4wdw0PVlhyphenhyphenQI3_xiJmvQ1RJvYD2HPn_lnwf6VIKwm_vx9fMtb0kUh4j4xoPgB_QeE81wsYHdPKkpvLbuDqkyS9h_ycKbEZ-7VCSjxpq-XYR80oAeTcKL/s1104/6E5FC3E0-5331-47EC-916E-360408989574.jpeg"
    ],
    description: "Water-resistant technical jacket. Reflective details. Asymmetrical zip.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Dark Grey"],
    badge: "SOLD OUT",
  },
  {
    id: "p5",
    name: "PHANTOM PANTS",
    price: 350,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKcmGjTYIGNJI9eK3y1tPqskh2ztXJPzJpJ6dAcJsQ3Zz-5iBgwlQkRyFHMNN5q09ArRcFdfHnwlQhIFVTxMRPbxV1JPKc-IrdKE81_q5_y9On1zGiQu1MCXFUwxIqBKB36XGWM9w0hxVYJ8_GgfWysNqk8x5OOtmK63Iuy293U-56jVUk55erXXWVkx-D/s1158/C68714A4-E1C2-4995-B3AA-E8127EDEB46A.jpeg",
    gallery: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhKcmGjTYIGNJI9eK3y1tPqskh2ztXJPzJpJ6dAcJsQ3Zz-5iBgwlQkRyFHMNN5q09ArRcFdfHnwlQhIFVTxMRPbxV1JPKc-IrdKE81_q5_y9On1zGiQu1MCXFUwxIqBKB36XGWM9w0hxVYJ8_GgfWysNqk8x5OOtmK63Iuy293U-56jVUk55erXXWVkx-D/s1158/C68714A4-E1C2-4995-B3AA-E8127EDEB46A.jpeg",
    ],
    description: "Chunky knit beanie. Metal logo plaque.",
    sizes: ["190","180","170","160"],
    colors: ["Black"],
  },
  {
    id: "p6",
    name: "GRNBURVZS FEIN",
    price: 619,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgk0oK4pu8Y95Hpu_q375_SaqNNoQ9DJsb7WzKLBwl2AGyrAYh_rxZW63EdLymGRXE-HsU9FxaWNM4wuqJ_1INHjnfJmdsOOvXOyGTaTzUhB7jbR3zcn_l1YG4Owt328-Xt5UEsf4H-fp4vl7A0csYFyCEVbCRKE6VHI3723a_IoaWBpt9Ya_pLWAaNIu8g/s828/3B10E050-BCDF-4895-BBE0-55397C97494F.jpeg",
    gallery: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgk0oK4pu8Y95Hpu_q375_SaqNNoQ9DJsb7WzKLBwl2AGyrAYh_rxZW63EdLymGRXE-HsU9FxaWNM4wuqJ_1INHjnfJmdsOOvXOyGTaTzUhB7jbR3zcn_l1YG4Owt328-Xt5UEsf4H-fp4vl7A0csYFyCEVbCRKE6VHI3723a_IoaWBpt9Ya_pLWAaNIu8g/s828/3B10E050-BCDF-4895-BBE0-55397C97494F.jpeg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgE08EEoshthHdZW_-nhNBzIEoO5KoMhnXNDenzgXQClQjlLPH58EPs4Ya8zJwmR0Qgq8_ZKwewRwNatlUyXHmOBUENe9NmySOe0Dpy8ew-F8x8CmRDbHty85PlwgzXdz7m6rC23YfJTLST4idloBEqJ4COKZ_sfgsRVWnMoNwFwWFh_UTzY1q0NY0eybnf/s828/C0321D46-0792-4463-B8E5-13E536898FB2.jpeg"
    ],
    description: "Chunky futuristic silhouette. Premium leather and mesh construction.",
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: ["Black"],
    badge: "LIMITED",
    isFlashDeal: true,
    flashDealEndsAt: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
  },
  {
    id: "p7",
    name: "BOOCKET BZS",
    price: 210,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8MVjJyteBdV6HNMhcECCGEpiDjVPW-M4z7UBbTDmoTHGUGDB_zskc3QLR5jD-cGJmCMcWfniWoEhqsGS1hx9AH5KokFi3suN-rUvobEgfjqN3mFcaTsugv_HymdkQ2WeoYRKgTQoVlxki6rceUy4kVidsagoq_EitLUgNGPSYjUBfdqN8roXY88PpgPGj/s1104/DCD9D515-C6D9-46D1-A044-8D313AEDF5B4.jpeg",
    gallery: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8MVjJyteBdV6HNMhcECCGEpiDjVPW-M4z7UBbTDmoTHGUGDB_zskc3QLR5jD-cGJmCMcWfniWoEhqsGS1hx9AH5KokFi3suN-rUvobEgfjqN3mFcaTsugv_HymdkQ2WeoYRKgTQoVlxki6rceUy4kVidsagoq_EitLUgNGPSYjUBfdqN8roXY88PpgPGj/s1104/DCD9D515-C6D9-46D1-A044-8D313AEDF5B4.jpeg",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiRzdW2vfpBdYKMkyRs4WVHrJEKaqzRIHN0I-tTFy4G5YgWxuFHIgQdyGraXy1fBFqxg-z69O6i3ZzwMowQR7GyAs-7mxZPVCrRtTByOrCyR6CaoGR2dPOuvkb4CObWUCNyRfEJfTDtGyUJTWs1RoGB9111ArPm4ghoYGe9yeOuKJnrlFy7zl8hfMMfeX3b/s1024/IMG_5054_SnapseedCopy.jpeg"
    ],
    description: "Breathable neoprene face mask. Adjustable ear loops.",
    sizes: ["STANDART"],
    colors: ["Black"],
  },
  {
    id: "p8",
    name: "HEADBAND BRVZS",
    price: 99,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZs_8ljzF_QvNC45ypfOZOSEfQ3WWFf_L0Ctraur1aSAUI5R4wSFSxIfUQnnzSFnxVN6HioAp_qcy-zxDDCw1H5VNuUWlBUZ4ABiOsQ4kxcgO5yoOb75gn6z193AR2_1ExSETBP9D2r9rTkbUcaWVrH0eURu2mq0q-hFQ7aECfaKOrTTDwGop5XX9AqA5N/s1024/IMG_5045.png",
    gallery: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZs_8ljzF_QvNC45ypfOZOSEfQ3WWFf_L0Ctraur1aSAUI5R4wSFSxIfUQnnzSFnxVN6HioAp_qcy-zxDDCw1H5VNuUWlBUZ4ABiOsQ4kxcgO5yoOb75gn6z193AR2_1ExSETBP9D2r9rTkbUcaWVrH0eURu2mq0q-hFQ7aECfaKOrTTDwGop5XX9AqA5N/s1024/IMG_5045.png",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhP_90UT5QOog9qh55KZZaz1Ex5pOmcE_gzXjVQ6YlDSx3OamFWJklySQ30p6w7ufgs0U68clcaEIVz5YR1W6_RaYBT1jV-TMdgHr4_jEVa76KNvz7BW25Fw3Naqbn8BGDhdV1iAU8gyUJ1OWJuOoD8-txA7gDRDncekIhBdMOvKHcjTCDxrxFrPXJadLSB/s1024/IMG_5046.png"
    ],
    description: "Heavy-duty canvas tote bag. Matte black hardware.",
    sizes: ["standart"],
    colors: ["Black","White"],
  },
  // ==========================================
  // 👇 ADD YOUR NEW PRODUCTS BELOW THIS LINE 👇
  // ==========================================
  {
    // 1. Give it a unique ID (e.g., "p9", "p10", "p11")
    id: "p9", 
    
    // 2. The name of your product
    name: "coming soon", 
    
    // 3. The price (just the number)
    price: 999, 
    
    // 4. The main image shown on the shop page
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhROETjgryBd_oG8DD4xMhiWSXb7wV9tyqex59xT3segs0J3zXaL8DC_53N6mE9LE1-swWgcV7YF4hESzvKE49xU_wKCHP4XdSGPW96GsCHMjsSKLw8-wC1D7Nd0c_Yo2jUGTjGO-vLB9JgGbOJX98ROxplSIZHpWh68iXjG-SU6Yx24YcicNcVTkQm7liC/s3464/A4E1C3BB-C5BF-460C-A05C-3A0529475A48.jpeg", 
    
    // 5. The images shown when you click the product (can be multiple)
    gallery: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhROETjgryBd_oG8DD4xMhiWSXb7wV9tyqex59xT3segs0J3zXaL8DC_53N6mE9LE1-swWgcV7YF4hESzvKE49xU_wKCHP4XdSGPW96GsCHMjsSKLw8-wC1D7Nd0c_Yo2jUGTjGO-vLB9JgGbOJX98ROxplSIZHpWh68iXjG-SU6Yx24YcicNcVTkQm7liC/s3464/A4E1C3BB-C5BF-460C-A05C-3A0529475A48.jpeg",
    ],
    
    // 6. The description of the product
    description: "This is a placeholder product. Change this text to describe your item.",
    
    // 7. Available sizes
    sizes: ["S", "M", "L", "XL"], 
    
    // 8. Available colors
    colors: ["Black", "White"],
    
    // OPTIONAL: Add a badge like "LIMITED", "SOLD OUT", or "RESTOCK SOON"
    // badge: "LIMITED", 
  }
];
