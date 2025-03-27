import React, { useState } from 'react'
import { CustomModel } from '@/components/ui/custom/models/CustomModel'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useDispatch } from 'react-redux'
import ImageProvider from '@/lib/hooks/ImageProvider'
import { selectModels, setIsAddToCart, setIsCustomize } from '@/lib/store/slices/models.slice'
import { useSelector } from 'react-redux'
import { Plus, Minus, Circle, ChevronLeft, ShoppingCart } from 'lucide-react'
import { isDesktop, isMobile } from '@/lib/hooks/Diamensions'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { Separator } from '@radix-ui/react-separator'
interface AddOn {
  name: string;
  price: number;
  isVeg?: boolean;
}

const AddToCard = () => {
  const dispatch = useDispatch()
  const modelsOpen = useSelector(selectModels)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentImageIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = productImages.length - 1
      if (nextIndex >= productImages.length) nextIndex = 0
      return nextIndex
    })
  }

  const addOns: AddOn[] = [
    { name: 'Lettuce', price: 20, isVeg: true },
    { name: 'Onions', price: 20, isVeg: true },
    { name: 'Olives', price: 20, isVeg: true },
    { name: 'Becan', price: 20, isVeg: false },
  ]

  const beverages: AddOn[] = [
    { name: 'Coke (250ml)', price: 20 },
    { name: 'Pepsi (350ml)', price: 20 },
    { name: 'Fanta', price: 20 },
    { name: 'Pepsi', price: 20 },
  ]
  const sides: AddOn[] = [
    { name: 'Veggie Strips', price: 20 },
    { name: '4pcs Chrunchy Chiken Nuggets', price: 20 },
    { name: 'Fiery Hell Dip', price: 20 },
    { name: '4pcs Chrunchy Chiken Nuggets', price: 20 },
  ]
  const productImages = [
    ImageProvider()?.src,
    ImageProvider()?.src,
    ImageProvider()?.src,
  ]
  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  return (
    <div>
      <CustomModel
        open={modelsOpen.isAddToCart}
        setOpenModel={() => {
          dispatch(setIsAddToCart(false))
          dispatch(setIsCustomize(false))
        }}
        closeModel={() => {
          dispatch(setIsAddToCart(false))
          dispatch(setIsCustomize(false))
        }}
        title=""
        trigger={<Button variant="outline">Customize</Button>}
        contentClassName="  lg:h-[60vh] md:h-[60vh] h-[90vh]   "
      >
        {isMobile() && (
          <div className="flex flex-col h-full">
            <div className="relative mt-1 overflow-hidden h-[300px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentImageIndex}
                  src={productImages[currentImageIndex]}
                  alt="Product"
                  className="w-full h-[300px] rounded-t-xl object-cover"
                  custom={direction}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction > 0 ? 1000 : -1000,
                      opacity: 0,
                      position: 'absolute'
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1,
                      position: 'absolute'
                    },
                    exit: (direction: number) => ({
                      zIndex: 0,
                      x: direction < 0 ? 1000 : -1000,
                      opacity: 0,
                      position: 'absolute'
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(e, { offset, velocity }: PanInfo) => {
                    setIsDragging(false)
                    const swipe = swipePower(offset.x, velocity.x)

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1)
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1)
                    }
                  }}
                />
              </AnimatePresence>
              <button onClick={() => {
                dispatch(setIsAddToCart(false))
                dispatch(setIsCustomize(false))
              }} className="absolute z-10 top-4 left-4 p-2 rounded-full border-[1.5px] border-white bg-transparent">
                <ChevronLeft size={20} className="text-white" />
              </button>
              {/* Dots indicator */}
              <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
                {productImages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 rounded-full cursor-pointer ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                      }`}
                    initial={false}
                    animate={{
                      width: currentImageIndex === index ? 24 : 4
                    }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      if (!isDragging) {
                        const newDirection = index > currentImageIndex ? 1 : -1
                        setDirection(newDirection)
                        setCurrentImageIndex(index)
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="p-4  rounded-t-3xl relative z-10 bg-white -mt-5 flex-1">
              <h2 className="text-xl font-bold">Grilled Chicken Burger</h2>
              <div className="text-md font-semibold text-appColor mt-1">$20.98</div>
              <Separator className="my-2 h-[1.2px] bg-gray-200" />
              <div className="mt-6">
                <h3 className="text-[16px] font-semibold mb-2">Description</h3>
                <p className="text-gray-600 text-[14px] ">
                  Burger With Meat is a typical food from our restaurant that is much in demand by many people, this is very recommended for you.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-[16px] font-semibold mb-2">Ingredients</h3>
                <ul className="space-y-2">
                  {[
                    'Cheese Slice',
                    'Grilled Chicken',
                    'Tandori Dips',
                    'Lettuce, Tomatoes, Olives'
                  ].map((item) => (
                    <li key={item} className="text-gray-600 text-[14px]">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-[16px] font-semibold mb-2">Ingredients</h3>
                <ul className="space-y-2">
                  {[
                    'Cheese Slice',
                    'Grilled Chicken',
                    'Tandori Dips',
                    'Lettuce, Tomatoes, Olives'
                  ].map((item) => (
                    <li key={item} className="text-gray-600 text-[14px]">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="sticky bg-white  z-10 flex flex-col gap-2 bottom-0 left-0 right-0 p-1 rounded-xl">
              <Button className="w-full h-12 rounded-full bg-appColor hover:bg-appColor/90 text-white">
                <ShoppingCart className="!w-6  !h-6" />  Add to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 rounded-full"
                onClick={() => {
                  dispatch(setIsCustomize(true))
                  dispatch(setIsAddToCart(false))
                }}
              >
                Customisable
              </Button>
            </div>
          </div>
        )}
        {
          isDesktop() && (
            <>
              <div className=" ">
                <img
                  src={ImageProvider()?.src}
                  alt="Grilled Chicken Sandwich"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Grilled Chicken Sandwich</h3>
                    <span className="text-appColor font-bold">$36</span>
                  </div>
                  <div className=" flex gap-2 ">
                    <Button className=" w-fit ">Add to Cart</Button>
                    <Button onClick={() => {
                      dispatch(setIsAddToCart(false))
                      dispatch(setIsCustomize(true))
                    }} variant="outline" className=" w-fit ">Customize</Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    A grilled or fried sandwich with a filling and melted cheese. A grilled or fried sandwich with a filling and double spicy flavour.
                  </p>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Ingredients</h4>
                    <ul className="text-sm space-y-1">
                      {['Bread', 'Cheese', 'Tomato', 'Coriander'].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </CustomModel>
      <CustomModel
        open={modelsOpen.isCustomize}
        setOpenModel={() => {
          dispatch(setIsAddToCart(true))
          dispatch(setIsCustomize(false))
        }}
        closeModel={() => {
          dispatch(setIsAddToCart(true))
          dispatch(setIsCustomize(false))
        }}
        title=""
        trigger={<Button variant="outline">Customize</Button>}
        contentClassName=" bg-gray-50    rounded-t-xl"
      >
        <div className=" ">
          <div className="flex relative bg-white rounded-2xl card-shadow  items-center gap-2 p-4 ">
            <img
              src={ImageProvider()?.src}
              alt="Product"
              className="w-10 h-10 rounded-md object-cover"
            />
            <h3 className="text-base font-semibold">Grilled Chicken Burger</h3>
            <div className=" absolute top-1/2 -translate-y-1/2 right-3 hover:scale-110 transition-all duration-300 rotate-45 ">
            <Plus size={23} className="text-black" />
            </div>
          </div>
          <div className=" mt-4 pb-5 space-y-4">
            <h4 className="text-base font-medium">Customise as per your taste</h4>

            <div className="bg-white rounded-xl card-shadow p-4 ">
              <h5 className="text-sm font-semibold w-full border-b pb-2 mb-2">Add-ons</h5>
              {addOns.map((addon) => (
                <div key={addon.name} className="flex  items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className={`border-2 p-[2px] ${addon.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                      <Circle className={`w-2 h-2 ${addon.isVeg ? 'fill-green-500' : 'fill-red-500'}`} />
                    </div>
                    <span className="text-sm">{addon.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">+${addon.price}</span>
                    <Checkbox
                      id={addon.name}
                      className="border-2 border-gray-300 data-[state=checked]:bg-appColor   data-[state=checked]:border-appColor"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl card-shadow p-4 ">
              <h5 className="text-sm font-semibold w-full border-b pb-2 mb-2">Add Beverages</h5>
              {beverages.map((beverage) => (
                <div key={beverage.name} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-green-500 p-[2px]">
                      <Circle className="w-2 h-2 fill-green-500" />
                    </div>
                    <span className="text-sm">{beverage.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">+${beverage.price}</span>
                    <Checkbox
                      id={beverage.name}
                      className="border-2 border-gray-300 data-[state=checked]:bg-appColor   data-[state=checked]:border-appColor"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl card-shadow p-4 ">
              <h5 className="text-sm font-semibold w-full border-b pb-2 mb-2">Choose your Sides</h5>
              {sides.map((side) => (
                <div key={side.name} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-red-500 p-[2px]">
                      <Circle className="w-2 h-2 fill-red-500" />
                    </div>
                    <span className="text-sm">{side.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">+${side.price}</span>
                    <Checkbox
                      id={side.name}
                      className="border-2 border-gray-300 data-[state=checked]:bg-appColor   data-[state=checked]:border-appColor"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className=" sticky  flex gap-4 bottom-0 left-0 right-0 p-4 bg-white rounded-xl ">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 border-appColor border-[1.5px] bg-rose-50 rounded-lg py-1 px-2">
                  <button onClick={decreaseQuantity} className="p-1">
                    <Minus size={16} className="text-black" />
                  </button>
                  <span className="text-base min-w-8 text-center">{quantity}</span>
                  <button onClick={increaseQuantity} className="p-1">
                    <Plus size={16} className="text-black" />
                  </button>
                </div>
              </div>
              <Button className="w-full rounded-full bg-appColor hover:bg-appColor/90 text-white">
                Update item
              </Button>
            </div>
          </div>
        </div>
      </CustomModel>
    </div>

  )
}

export default AddToCard