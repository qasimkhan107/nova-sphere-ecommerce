import { IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Stack } from '@mui/material'
import React from 'react'
import { facebookPng, instagramPng, twitterPng, linkedinPng } from '../../assets'
import SendIcon from '@mui/icons-material/Send'
import { MotionConfig, motion } from 'framer-motion'

export const Footer = () => {

    const theme = useTheme()
    const is700 = useMediaQuery(theme.breakpoints.down(700))

    const labelStyles = {
        fontWeight: 300,
        cursor: 'pointer'
    }

    return (
        <Stack
            sx={{
                backgroundColor: theme.palette.primary.main,
                paddingTop: "3rem",
                paddingLeft: is700 ? "1rem" : "3rem",
                paddingRight: is700 ? "1rem" : "3rem",
                paddingBottom: "1.5rem",
                rowGap: "3rem",
                color: theme.palette.primary.light,
                justifyContent: "space-around"
            }}
        >

            {/* Upper */}
            <Stack
                flexDirection={'row'}
                rowGap={'1rem'}
                justifyContent={is700 ? "" : 'space-around'}
                flexWrap={'wrap'}
            >

                {/* Subscribe */}
                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6' fontSize={'1.5rem'}>
                        NOVA SPHERE
                    </Typography>

                    <Typography variant='h6'>
                        Subscribe
                    </Typography>

                    <Typography sx={labelStyles}>
                        Get updates about new products
                    </Typography>

                    <TextField
                        placeholder='Enter your email'
                        sx={{
                            border: '1px solid white',
                            borderRadius: "6px"
                        }}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SendIcon sx={{ color: theme.palette.primary.light }} />
                                </IconButton>
                            ),
                            style: { color: "whitesmoke" }
                        }}
                    />
                </Stack>

                {/* Support */}
                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6'>Support</Typography>

                    <Typography sx={labelStyles}>
                        11th Main Street, Gulshan Phase VIII, Karachi, Pakistan
                    </Typography>

                    <Typography sx={labelStyles}>
                        hqsw@gmail.com
                    </Typography>

                    <Typography sx={labelStyles}>
                        +92 315 0294487
                    </Typography>
                </Stack>

                {/* Account */}
                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6'>Account</Typography>

                    <Typography sx={labelStyles}>My Account</Typography>
                    <Typography sx={labelStyles}>Login / Register</Typography>
                    <Typography sx={labelStyles}>Cart</Typography>
                    <Typography sx={labelStyles}>Wishlist</Typography>
                    <Typography sx={labelStyles}>Shop</Typography>
                </Stack>

                {/* Quick Links */}
                <Stack rowGap={'1rem'} padding={'1rem'}>
                    <Typography variant='h6'>Quick Links</Typography>

                    <Typography sx={labelStyles}>Privacy Policy</Typography>
                    <Typography sx={labelStyles}>Terms Of Use</Typography>
                    <Typography sx={labelStyles}>FAQ</Typography>
                    <Typography sx={labelStyles}>Contact</Typography>
                </Stack>

            </Stack>

            {/* Social Icons */}
            <Stack
                mt={1}
                flexDirection={'row'}
                justifyContent={'center'}
                columnGap={'2rem'}
            >
                <MotionConfig>
                    <motion.img whileHover={{ scale: 1.1 }} src={facebookPng} alt="Facebook" style={{ cursor: "pointer" }} />
                    <motion.img whileHover={{ scale: 1.1 }} src={twitterPng} alt="Twitter" style={{ cursor: "pointer" }} />
                    <motion.img whileHover={{ scale: 1.1 }} src={instagramPng} alt="Instagram" style={{ cursor: "pointer" }} />
                    <motion.img whileHover={{ scale: 1.1 }} src={linkedinPng} alt="LinkedIn" style={{ cursor: "pointer" }} />
                </MotionConfig>
            </Stack>

            {/* Lower */}
            <Stack alignSelf={"center"}>
                <Typography color={'GrayText'}>
                    &copy; NOVA SPHERE {new Date().getFullYear()}. All rights reserved.
                </Typography>
            </Stack>

        </Stack>
    )
}