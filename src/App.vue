<template>
  <c-theme-provider>
    <c-reset />
    <c-flex bg="brand.500" minHeight="100vh">
      <c-flex flexDirection="column" pt="12" px="3" width="100%">
        <c-box
          maxWidth="520px"
          mx="auto"
          p="6"
          bg="white"
          my="auto"
          borderRadius="4px"
          boxShadow="0 1px 46px -4px rgb(0 0 0 / 28%)"
        >
          <c-heading size="lg" as="h1" mb="3" fontWeight="semibold"
            >Coinbase Cost Basis Calculator</c-heading
          >
          <c-text mb="4" fontSize="sm"
            >Your <strong>cost basis</strong> is the amount you’ve paid for a
            given asset. This can be a valuable metric to consider when making
            investment decisions.
          </c-text>
          <c-heading
            size="xs"
            as="h4"
            mb="1"
            textTransform="uppercase"
            fontWeight="400"
            opacity="0.75"
            letterSpacing="1px"
            >How to use this tool</c-heading
          >
          <c-list fontSize="sm" style-type="decimal" mb="4">
            <c-list-item
              >Log into Coinbase and go to
              <c-link
                href="https://www.coinbase.com/reports"
                isExternal
                color="brand.500"
                fontWeight="500"
                >Taxes &amp; Reports</c-link
              ></c-list-item
            >
            <c-list-item>
              Click <em>Generate Report</em> and download the CSV report.
            </c-list-item>
            <c-list-item>
              Open the CSV file with TextEdit or Notepad. Paste the contents
              below.
            </c-list-item>
          </c-list>
          <Calculator />
        </c-box>
        <c-text
          mx="auto"
          mt="auto"
          py="3"
          fontSize="xs"
          color="white"
          width="100%"
          textAlign="center"
          >This isn’t affiliated with Coinbase. I just made it because it's
          missing from their dashboard. This isn’t advice and there isn’t a
          warranty. If you suspect there's a bug or you’d like to make an
          improvement,
          <c-link
            href="https://github.com/noahlitvin/coinbase-costbasis"
            isExternal
            textDecoration="underline"
            >check out the code</c-link
          >
          and submit a pull request.</c-text
        >
      </c-flex>
    </c-flex>
  </c-theme-provider>
</template>

<script>
import Calculator from "./components/Calculator";

export default {
  name: "App",
  components: {
    Calculator,
  },
};
</script>
