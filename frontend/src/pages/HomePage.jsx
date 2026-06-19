import React, { useEffect } from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { ProductList } from '../features/products/components/ProductList'
import {
  resetAddressStatus,
  selectAddressStatus
} from '../features/address/AddressSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Footer } from '../features/footer/Footer'

import {
  Stack,
  Paper,
  IconButton
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export const HomePage = () => {

  const dispatch = useDispatch()
  const addressStatus = useSelector(selectAddressStatus)

  useEffect(() => {
    if (addressStatus === 'fulfilled') {
      dispatch(resetAddressStatus())
    }
  }, [addressStatus, dispatch])

  // Restore scroll position after returning from Product Details
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('productListScroll')

    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScroll),
          behavior: 'auto'
        })
      }, 300)

      sessionStorage.removeItem('productListScroll')
    }
  }, [])

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const scrollBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <Navbar isProductList={true} />

      {/* Floating Vertical Toolbar */}
      <Paper
        elevation={4}
        sx={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 999,
          borderRadius: '20px',
          overflow: 'hidden'
        }}
      >
        <Stack>
          <IconButton onClick={scrollTop}>
            <KeyboardArrowUpIcon />
          </IconButton>

          <IconButton>
            <SearchIcon />
          </IconButton>

          <IconButton onClick={scrollBottom}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Stack>
      </Paper>

      <ProductList />

      <Footer />
    </>
  )
}

export default HomePage