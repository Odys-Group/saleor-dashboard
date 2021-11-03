import { Button } from "@material-ui/core";
import CardSpacer from "@saleor/components/CardSpacer";
import ConfirmButton from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Grid from "@saleor/components/Grid";
import Metadata from "@saleor/components/Metadata";
import { ActionBar } from "@saleor/macaw-ui";
import React from "react";
import { FormattedMessage } from "react-intl";

import GiftCardUpdateDetailsCard from "./GiftCardUpdateDetailsCard";
import GiftCardUpdateInfoCard from "./GiftCardUpdateInfoCard";
import GiftCardUpdatePageHeader from "./GiftCardUpdatePageHeader";
import useGiftCardDetails from "./providers/GiftCardDetailsProvider/hooks/useGiftCardDetails";
import useGiftCardUpdateDialogs from "./providers/GiftCardUpdateDialogsProvider/hooks/useGiftCardUpdateDialogs";
import useGiftCardUpdate from "./providers/GiftCardUpdateFormProvider/hooks/useGiftCardUpdate";
import useGiftCardUpdateForm from "./providers/GiftCardUpdateFormProvider/hooks/useGiftCardUpdateForm";
import useStyles from "./styles";

const GiftCardUpdatePage: React.FC = () => {
  const { navigateBack, openDeleteDialog } = useGiftCardUpdateDialogs();
  const { giftCard } = useGiftCardDetails();
  const classes = useStyles();

  const {
    hasChanged,
    submit,
    data,
    handlers: { changeMetadata }
  } = useGiftCardUpdateForm();

  const {
    opts: { loading: loadingUpdate, status }
  } = useGiftCardUpdate();

  return (
    <Container>
      <GiftCardUpdatePageHeader />
      <Grid>
        <div>
          <GiftCardUpdateDetailsCard />
          <CardSpacer />
          <Metadata data={data} onChange={changeMetadata} />
        </div>
        <div>
          <GiftCardUpdateInfoCard />
        </div>
      </Grid>
      <ActionBar state={status} disabled={loadingUpdate || !hasChanged}>
        <Button
          onClick={openDeleteDialog}
          className={classes.deleteButton}
          variant="contained"
        >
          <FormattedMessage defaultMessage="Delete" />
        </Button>
        <div className={classes.spacer} />
        {!giftCard?.isExpired && (
          <>
            <Button
              onClick={navigateBack}
              className={classes.cancelButton}
              variant="text"
            >
              <FormattedMessage defaultMessage="Back" />
            </Button>
            <ConfirmButton
              onClick={submit}
              transitionState={status}
              variant="contained"
              disabled={loadingUpdate || !hasChanged}
            >
              <FormattedMessage defaultMessage="Save" />
            </ConfirmButton>
          </>
        )}
      </ActionBar>
    </Container>
  );
};

export default GiftCardUpdatePage;
