import {
  Card,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableRowLink from "@saleor/components/TableRowLink";
import { CountryListQuery } from "@saleor/graphql";
import { makeStyles } from "@saleor/macaw-ui";
import classNames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";

import { maybe, renderCollection } from "../../../misc";

const useStyles = makeStyles(
  {
    tableRow: {
      cursor: "pointer"
    },
    textRight: {
      textAlign: "right"
    }
  },
  { name: "CountryList" }
);

interface CountryListProps {
  countries: CountryListQuery["shop"]["countries"];
  getRowHref: (id: string) => string;
}

const CountryList: React.FC<CountryListProps> = props => {
  const { getRowHref, countries } = props;

  const classes = useStyles(props);

  return (
    <Card>
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage defaultMessage="Country Code" />
            </TableCell>
            <TableCell>
              <FormattedMessage defaultMessage="Country Name" />
            </TableCell>
            <TableCell className={classes.textRight}>
              <FormattedMessage defaultMessage="Reduced Tax Rates" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            countries,
            country => (
              <TableRowLink
                className={classNames({
                  [classes.tableRow]: !!country
                })}
                hover={!!country}
                href={country && getRowHref(country.code)}
                key={country ? country.code : "skeleton"}
              >
                <TableCell>
                  {maybe<React.ReactNode>(() => country.code, <Skeleton />)}
                </TableCell>
                <TableCell>
                  {maybe<React.ReactNode>(() => country.country, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.textRight}>
                  {maybe<React.ReactNode>(
                    () => country.vat.reducedRates.length,
                    <Skeleton />
                  )}
                </TableCell>
              </TableRowLink>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={3}>
                  <FormattedMessage defaultMessage="No countries found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
CountryList.displayName = "CountryList";
export default CountryList;
