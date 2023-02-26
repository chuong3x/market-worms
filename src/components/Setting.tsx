import { useEffect, useState } from "react";
import {
    Button,
    Checkbox,
    Divider,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberInput,
    NumberInputField,
    Select,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";

import {
    useGetSettingQuery,
    useSetSettingMutation,
} from "../features/setting.api";
import { CandleChartInterval, ISetting, ITrend } from "../models";

interface SettingProps {}

const Setting: React.FC<SettingProps> = () => {
    const { data, isFetching } = useGetSettingQuery();
    const toast = useToast();
    const [settingState, setSettingState] = useState<ISetting>(
        data?.data as ISetting
    );

    const [setSetting, setSettingResult] = useSetSettingMutation();
    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        if (settingState) {
            setSetting(settingState as ISetting);
        }
    };
    const handleSelectInterval = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        settingState &&
            setSettingState({ ...settingState, interval: event.target.value });
    };
    const handleSelectCustomTrend = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        settingState &&
            setSettingState({
                ...settingState,
                customTrend: e.target.value as ITrend,
            });
    };
    useEffect(() => {
        if (data) {
            if (data.data) {
                setSettingState(data.data);
            } else {
                toast({ title: data.message, duration: 3000 });
            }
        }
    }, [data]);
    return (
        <div>
            <VStack w="full" h="full" spacing="0" p="4">
                <>
                    <Flex>
                        <Text>Take Profit Mode:</Text>
                        <Checkbox
                            // defaultChecked={settingState.takeProfitOnly}
                            onChange={(event) =>
                                setSettingState({
                                    ...settingState,
                                    takeProfitOnly: event.target.checked,
                                })
                            }
                        />
                    </Flex>
                    <Divider />

                    <Flex>
                        <Text>Interval:</Text>
                        <Select
                            // value={settingState.interval}
                            onChange={handleSelectInterval}
                            colorScheme="blackAlpha"
                            color="black"
                            flex="1"
                            mr="4"
                            // disabled={settingState.takeProfitOnly}
                        >
                            <option value="1m">1m</option>
                            <option value="3m">3m</option>
                        </Select>
                    </Flex>
                    <Flex>
                        <Text>TP Per:</Text>
                        <NumberInput
                            size="macos"
                            // defaultValue={settingState.profitExpected}
                            onChange={(
                                valueAsString: string,
                                valueAsNumber: number
                            ) =>
                                setSettingState({
                                    ...settingState,
                                    profitExpected: valueAsNumber,
                                })
                            }
                        >
                            <NumberInputField
                                h="full"
                                // disabled={settingState.takeProfitOnly}
                            />
                        </NumberInput>
                    </Flex>
                    <Flex>
                        <Text>Leverage:</Text>
                        <NumberInput
                            size="macos"
                            // defaultValue={settingState.leverage}
                            onChange={(
                                valueAsString: string,
                                valueAsNumber: number
                            ) =>
                                setSettingState({
                                    ...settingState,
                                    leverage: valueAsNumber,
                                })
                            }
                        >
                            <NumberInputField
                                h="full"
                                // disabled={settingState.takeProfitOnly}
                            />
                        </NumberInput>
                    </Flex>
                    <Flex>
                        <Text>Quantity:</Text>
                        <NumberInput
                            size="macos"
                            // defaultValue={settingState.quantity}
                            onChange={(
                                valueAsString: string,
                                valueAsNumber: number
                            ) =>
                                setSettingState({
                                    ...settingState,
                                    quantity: valueAsNumber,
                                })
                            }
                        >
                            <NumberInputField
                                h="full"
                                // disabled={settingState.takeProfitOnly}
                            />
                        </NumberInput>
                    </Flex>
                    <Flex>
                        <Text>Max Positions:</Text>
                        <NumberInput
                            size="macos"
                            // defaultValue={settingState.maxPositions}
                            onChange={(
                                valueAsString: string,
                                valueAsNumber: number
                            ) =>
                                setSettingState({
                                    ...settingState,
                                    maxPositions: valueAsNumber,
                                })
                            }
                        >
                            <NumberInputField

                            // disabled={settingState.takeProfitOnly}
                            />
                        </NumberInput>
                    </Flex>
                    <Flex>
                        <Text>Enable Avg Mode:</Text>
                        <Checkbox
                            // defaultChecked={settingState.enableAvgMode}
                            onChange={(event) =>
                                setSettingState({
                                    ...settingState,
                                    enableAvgMode: event.target.checked,
                                })
                            }
                            // disabled={settingState.takeProfitOnly}
                        />
                    </Flex>

                    <Flex>
                        <Text>Auto Dectect Trend:</Text>
                        <Checkbox
                            // defaultChecked={settingState.autoDetectTrend}
                            onChange={(event) =>
                                setSettingState({
                                    ...settingState,
                                    autoDetectTrend: event.target.checked,
                                })
                            }
                            // disabled={settingState.takeProfitOnly}
                        />
                    </Flex>
                    {/* {!settingState.autoDetectTrend && (
                        <Flex>
                            <Text>Priority Trend:</Text>
                            <Select
                                value={settingState.customTrend}
                                onChange={handleSelectCustomTrend}
                                colorScheme="blackAlpha"
                                color="black"
                                flex="1"
                                mr="4"
                                disabled={settingState.takeProfitOnly}
                            >
                                <option value={"LONG"}>LONG</option>
                                <option value={"SHORT"}>SHORT</option>
                            </Select>
                        </Flex>
                    )} */}
                </>
                {/* {settingState && (
                    
                )} */}
            </VStack>
        </div>
    );
};

export default Setting;
