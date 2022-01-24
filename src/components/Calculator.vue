<template>
  <div>
    <c-textarea
      placeholder="Paste the contents of your Coinbase report CSV here."
      v-model="input"
      fontSize="xs"
      spellcheck="false"
    />
    <c-box
      v-if="Object.entries(output) && Object.entries(output).length"
      mt="5"
    >
      <c-heading
        size="xs"
        as="h4"
        mb="1"
        textTransform="uppercase"
        fontWeight="400"
        opacity="0.75"
        letterSpacing="1px"
        >Results</c-heading
      >
      <c-text fontSize="sm"
        >Your cost basis is calculated using average cost accounting and only
        considers conversions between crypto assets, purchases, and
        sales.</c-text
      >
      <c-box
        v-for="assetData in Object.entries(output)"
        :key="assetData[0]"
        pt="3"
        mt="3"
        borderTop="1px solid #ddd"
      >
        <c-text fontSize="xs">
          You’ve effectively purchased
          {{ parseFloat(assetData[1].quantity.toFixed(10)) }}
          {{ assetData[0] }} for
          {{
            assetData[1].cost.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          }}. That's...
        </c-text>
        <c-text fontSize="lg" fontweight="semibold">
          {{
            (assetData[1].cost / assetData[1].quantity).toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )
          }}
          per
          {{ assetData[0] }}
        </c-text>
      </c-box>
    </c-box>
  </div>
</template>

<script>
import csv from "csvtojson";

export default {
  name: "Calculator",
  data: () => {
    return {
      input: "",
    };
  },
  asyncComputed: {
    async output() {
      const preheaderRemoved = this.input.split("\n").slice(7).join("\n");
      const parsedData = await csv().fromString(preheaderRemoved);

      const output = {};
      for (const data of parsedData) {
        if (!output[data["Asset"]]) {
          output[data["Asset"]] = {
            cost: 0,
            quantity: 0,
          };
        }

        switch (data["Transaction Type"]) {
          case "Buy": {
            output[data["Asset"]].cost += Number(
              data["Total (inclusive of fees)"]
            );
            output[data["Asset"]].quantity += Number(
              data["Quantity Transacted"]
            );

            break;
          }
          case "Sell": {
            output[data["Asset"]].cost -= Number(
              data["Total (inclusive of fees)"]
            );
            output[data["Asset"]].quantity -= Number(
              data["Quantity Transacted"]
            );
            break;
          }
          case "Convert": {
            const notesData = data["Notes"].split(" ");
            const price = Number(data["Total (inclusive of fees)"]);
            const soldQuantity = Number(notesData[1]);
            const soldAsset = notesData[2];
            const purchasedQuantity = Number(notesData[4]);
            const purchasedAsset = notesData[5];

            output[soldAsset].cost -= price;
            output[soldAsset].quantity -= soldQuantity;

            if (!output[purchasedAsset]) {
              output[purchasedAsset] = {
                cost: 0,
                quantity: 0,
              };
            }
            output[purchasedAsset].cost += price;
            output[purchasedAsset].quantity += purchasedQuantity;

            break;
          }
        }
      }

      return output;
    },
  },
};
</script>
