import Slide from '@components/Presentation/Slide';
import Heading from '@components/Presentation/Heading';
import Grid from '@components/Presentation/Grid';
import Box from '@components/Presentation/Box';
import Text from '@components/Presentation/Text';
import SavePresentation from '@components/SavePresentation';

// ? TODO make editable

const HighlightsImpediments = ({ isSaved }) => {
  <Slide>
    <Heading type="h6" textAlign="left">
      Highlights & Impediments
    </Heading>
    <Grid columns={2} width="90%">
      <Box border="1px solid white" title="Highlights">
        <Text>Käse</Text>
        <Text>Käse</Text>
        <Text>Käse</Text>
        <Text>Käse</Text>
      </Box>
      <Box border="1px solid white" title="Impediments">
        <Text>Käse</Text>
        <Text>Käse</Text>
        <Text>Käse</Text>
        <Text>Käse</Text>
        <Text>Käse</Text>
      </Box>
    </Grid>
    {!isSaved && <SavePresentation />}
  </Slide>;
};

export default HighlightsImpediments;
