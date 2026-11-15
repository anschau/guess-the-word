import { FontAwesome } from '@react-native-vector-icons/fontawesome/static'
import PixelButton from './PixelButton'
import { ButtonContent } from './Common.styles'
import styled from 'styled-components/native'
import { theme } from '../theme/theme'
import { getTextVariantStyles, TypographyVariant } from '../theme/typography'
const Button = styled(PixelButton)({ alignSelf: 'flex-start' })

const Label = styled.Text({
  ...getTextVariantStyles(TypographyVariant.BUTTON),
  fontSize: 25,
})

export default function BackButton({
  label,
  onPress,
}: {
  label: string
  onPress: () => void
}) {
  return (
    <Button variant="neutral" accessibilityLabel={label} onPress={onPress}>
      <ButtonContent>
        <FontAwesome
          name="arrow-left"
          size={20}
          color={theme.colors.text}
          accessible={false}
        />
        <Label>{label}</Label>
      </ButtonContent>
    </Button>
  )
}
