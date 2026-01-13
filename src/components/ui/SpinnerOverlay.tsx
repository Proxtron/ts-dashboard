import { createOverlay, Dialog, Portal, Spinner } from "@chakra-ui/react"


const SpinnerOverlay = (props: {}) => {
    const { ...rest} = props
    return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Spinner/>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    )
}

const SpinnerOverlayManager = createOverlay(SpinnerOverlay)

export default SpinnerOverlayManager;