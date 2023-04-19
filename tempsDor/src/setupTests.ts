import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { configure } from "@testing-library/dom";

configure({ testIdAttribute: "data-test-id" });
